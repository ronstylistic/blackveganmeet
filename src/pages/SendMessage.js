import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import { Container, Content, Item, Input, Button } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';
import firebase from 'react-native-firebase';

import { GiftedChat } from 'react-native-gifted-chat';

export default class SendMessage extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };

        this.db = firebase.firestore();
        this.user = firebase.auth().currentUser;

        this.unsubscribe = null;
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader
                navigation={navigation}
                headerTitle={navigation.state.params.firstname + ' ' + navigation.state.params.lastname} />
        )
    });

    componentDidMount() {

        this.db.collection("Messages")
            .doc(this.getId())
            .collection('Conversation')
            .orderBy('createdAt', 'asc')
            .onSnapshot((snapshot) => {

                let _messages = [];
                let source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";

                if( source == "Server"){
                    snapshot.docChanges.forEach((change) => {
                        //alert(change.doc.data()[0].text);
                        this.setState(previousState => ({
                            messages: GiftedChat.append(previousState.messages, [{
                                _id: change.doc.data()._id,
                                text: change.doc.data().text,
                                createdAt: new Date(change.doc.data().createdAt),
                                user: {
                                    _id: change.doc.data().user._id
                                }
                            }]),
                        }));

                       // _messages.push();
                    });

                   
                }

            });
        
    }

    componentWillUnMount() {
        
    }
    generateId = () => {

        const receiverId = this.props.navigation.state.params.receiver;

        if (this.user.uid > receiverId)
            //return `${this.user.uid}-${receiverId}`;
            return { sender: this.user.uid, receiver: receiverId }
        else
            //return `${receiverId}-${this.user.uid}`;
            return { sender: receiverId, receiver: this.user.uid }
    }

    getId = () => {
        return this.props.navigation.state.params.threadId ? 
                this.props.navigation.state.params.threadId : 
                `${this.generateId().sender}-${this.generateId().receiver}`;
    }

    onSend(messages = []) {
        
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));

        const ref = this.db.collection("Messages").doc(this.getId());
        
        ref.get().then((doc) => {

            if(!doc.exists){

                ref.set({
                    sender: this.generateId().sender,
                    receiver: this.generateId().receiver
                })
                .catch((error) => {
                    const { code, message } = error;
                    Alert.alert('Error: ' + code, message);
                })
            }

            ref.collection('Conversation').add(messages[0])
            .then(() => {})
            .catch((error) => {
                const { code, message } = error;
                Alert.alert('Error: ' + code, message);
            })
        });

        /* this.db.collection("Messages").doc(this.generateId())
            .collection('Conversation').add(messages[0])
            .then(() => {})
            .catch((error) => {
                const { code, message } = error;
                Alert.alert('Error: ' + code, message);
            }); */
        /* this.db.collection("Messages").add({
            sender: this.user.uid,
            receiver: this.props.navigation.state.params.receiver
        }).then((ref) => {
            ref.collection('Conversation').add(messages[0])
            .then(() => {
            })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert('Error: ' + code, message);
            });
        })
        .catch((error) => {
            const { code, message } = error;
            Alert.alert('Error: ' + code, message);
        }) */
        
    
        Keyboard.dismiss();
    }

    /* sendMessage(message){
        this.db.collection("Messages").doc(this.generateId()).set(message)
        .then(() => {
        })
        .catch((error) => {
            const { code, message } = error;
            Alert.alert('Error: ' + code, message);
        })

        Keyboard.dismiss();
    } */


    render() {

        if (this.state.loading) return <Loader />

        return (

            <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>

                <GiftedChat
                    renderLoading={() =><ActivityIndicator size="large" color="#c6b689" />}
                    placeholder='Write a message'
                    messages={this.state.messages}
                    onSend={(message) => {
                        this.onSend(message);
                    }}
                    user={{
                        _id: this.user.uid
                    }}
                />
            </View>
        );
    }
}
