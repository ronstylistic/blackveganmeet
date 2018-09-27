import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { Container, Content, Item, Icon, Input, Button, List, Header } from 'native-base';
import CustomHeader from '../components/CustomHeader';

import Spinner from 'react-native-loading-spinner-overlay';

import firebase from 'react-native-firebase';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conversations: []
        }

        this.db = firebase.firestore();
        this.user = firebase.auth().currentUser;
        this.unsubscribe = null;
    }
    
    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='Messages' />
        )
    });

    componentDidMount() {

        //Sender
        this.db.collection('Messages').where("sender", "==", this.user.uid)

        .onSnapshot((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                
                let _users = [];
                this.db.collection('Users').doc(this.doc.data().receiver).get()
                .then((userDoc) => {
                    _users.push({
                        key: userDoc.id,
                        firstname: userDoc().firstname,
                        lastname: userDoc.data().lastname
                    });

                    this.setState({ conversations: this.state.conversations.concat(_users) });
                })
            });
        });

        //Receiver
        this.db.collection('Messages').where("receiver", "==", this.user.uid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let _users = [];

                    this.db.collection('Users').doc(doc.data().sender).get()
                        .then((userDoc) => {
                            
                            _users.push({
                                key: doc.id,
                                firstname: userDoc.data().firstname,
                                lastname: userDoc.data().lastname
                            });

                            this.setState({ conversations: this.state.conversations.concat(_users) });
                        })
                });

            });

    }

    componentWillUnmount() {
        //this.unsubscribe();
    }

    _renderItem = ({item}) => {
        return (
            <Item>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SendMessage', { threadId: item.key, firstname: item.firstname, lastname: item.lastname })}
                    style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
                    
                    <Image style={{width: 80, height: 80, margin: 5}} source={require('../../assets/profile.png')}/>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18}}>{item.firstname + ' ' + item.lastname}</Text>
                    </View>  
                </TouchableOpacity>
            </Item>
        )
    }

    
    render() {
        
        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

        return (
            <Container>

            <Content contentContainerStyle={styles.container}>
                <FlatList
                    data={this.state.conversations}
                    renderItem={this._renderItem}
                />

            </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    }
});
