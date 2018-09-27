import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert, ToastAndroid } from 'react-native';
import { Container, Content, Item, Input, Button  } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';
import firebase from 'react-native-firebase';

export default class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            error: '',
        }
    }
    
    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='Forgot Password?' />
        )
    });

    _sendLink() {
       
        if(this.state.email == ''){
            this.setState({error: '* email address should not be empty.'})
        }
        else if(!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            this.setState({error: '* email must be a valid email address'});
        }
        else {

            this.setState({loading: true});

            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(()=> {

                    ToastAndroid.show('Your password reset link was sent to your email address.', ToastAndroid.LONG);
                    this.setState({loading: false});
                    //this.props.navigation.navigate('Login');

                })
                .catch((error) => {
                    Alert.alert('Error: ' + error.code, error.message)
                    this.setState({loading: false});    
                })
        }
        
        Keyboard.dismiss();
    }

    render() {
        
        if(this.state.loading) return <Loader />

        return (
            <Container>
                <Content contentContainerStyle={styles.container} >
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Text
                            style={{ fontSize: 16, color: '#c6b689', paddingVertical: 5, alignSelf: 'flex-start' }}>
                            Please enter your email address and we will send you a reset link.
                        </Text>
                        <Item>
                            <Input
                                ref="email"
                                placeholder="Enter your email address"
                                onChangeText={(email) => this.setState({ email: email })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.email} />
                        </Item>
                        <Button
                            onPress={this._sendLink.bind(this)}
                            block style={{ backgroundColor: '#c6b689', marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Continue</Text>
                        </Button>

                        <Text style={{color: 'red', marginTop: 15}}>{this.state.error}</Text>
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
    }
});
