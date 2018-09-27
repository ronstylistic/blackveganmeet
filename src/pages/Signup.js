import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Container, Content, Item, Input, Button, Label } from 'native-base';

import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';

import firebase from 'react-native-firebase';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            error: '',
        }

        this.db = firebase.firestore();

    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='Create an account' />
        )
    });
    
    _signup() {

        if(this.state.email == ''){
            this.setState({error: '* email address should not be empty.'});
        }
        else if(!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            this.setState({error: '* email must be a valid email address'});
        }
        else if(this.state.password == ''){
            this.setState({error: '* password should not be empty.'})
        }
        else if(this.state.password.length < 8) {
            this.setState({error: '* password should must be atleast 8 characters long.'});
        }
        else if( this.state.firstname == ''){
            this.setState({error: '* firstname should not be empty.'});
        }
        else if( this.state.lastname == ''){
            this.setState({error: '* lastname should not be empty.'});
        }
        else {
                 
            this.setState({loading: true});
            
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {

                    firebase.auth().currentUser.sendEmailVerification()
                    .catch((error) => {
                        const { code, message } = error;
                        Alert.alert('Error: ' + code, message);
                    })

                    this.db.collection("Users").doc(user.user.uid).set({
                        id: user.user.uid,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        status: 'online'
                    }).catch((error) => {
                        const { code, message } = error;
                        Alert.alert('Error: ' + code, message);
                    })
                })
                .catch((error) => {
                    const { code, message } = error;
                    Alert.alert('Error: ' + code, message);
                    this.setState({loading: false});
                })

        }

        Keyboard.dismiss();
    }

    render() {
        
        if (this.state.loading) return <Loader />

        return (
            <Container>
                <Content contentContainerStyle={styles.container} >
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}>

                        <Text style={{ fontSize: 16, color: '#c6b689', paddingVertical: 5, alignSelf: 'flex-start' }} >New People Join Everyday!</Text>

                        <Item fixedLabel last>
                            <Label style={styles.label}>Email Address</Label>
                            <Input
                                placeholder="Enter your email address"
                                onChangeText={(email) => this.setState({ email: email })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>

                        <Item fixedLabel last>
                            <Label style={styles.label}>Password</Label>
                            <Input
                                placeholder="Enter your password"
                                onChangeText={(password) => this.setState({ password: password })}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>

                        <Item fixedLabel last>
                            <Label style={styles.label}>Firstname</Label>
                            <Input
                                placeholder='Enter your firstname'
                                onChangeText={(firstname) => this.setState({ firstname: firstname })}
                                autoCorrect={false} />
                        </Item>

                        <Item fixedLabel last>
                            <Label style={styles.label}>Lastname</Label>
                            <Input
                                placeholder='Enter your lastname'
                                onChangeText={(lastname) => this.setState({ lastname: lastname })}
                                autoCorrect={false} />
                        </Item>

                        <Button
                            onPress={this._signup.bind(this)}
                            block style={{ backgroundColor: '#c6b689', marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Sign Up</Text>
                        </Button>

                        <Text style={{color: 'red', marginTop: 15}}>{this.state.error}</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 10, paddingBottom: 20 }}>
                            <Text> Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={{ fontWeight: 'bold' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 10,
    },
    label: {
        color: '#111'
    }
});
