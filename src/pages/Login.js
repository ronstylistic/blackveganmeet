import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, Keyboard, Image } from 'react-native';
import { Container, Content, Item, Input, Button, Header, Title, Body } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';
import firebase from 'react-native-firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            error: ''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header
                androidStatusBarColor='#c6b689'
                style={{backgroundColor: '#f5f5f5'}} 
                noShadow={true}>
                <Body>
                    <Title style={{color: '#333', marginLeft:15}}>Login</Title>
                </Body>
                
            </Header>
        )
    });

    _login() {

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
        else {
            this.setState({loading: true});

            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    
                    AsyncStorage.setItem('currentUser', JSON.stringify(user));
                    //this.props.navigation.navigate('SecuredNav');
                    /* if(user.emailVerified){
                        this.setState({ loading: false });
                        AsyncStorage.setItem('currentUser', JSON.stringify(user));
                    } */

                })
                .catch((error) => {
                    Alert.alert('Error: ' + error.code, error.message)
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
                    
                    <View style={{flex: 1}}>
                        <Image style={{width: 150, height: 150}} source={require('../../assets/logo.png')} />
                    </View>

                    <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}>

                        <Item>
                            <Input
                                placeholder="Enter your email address"
                                onChangeText={(email) => this.setState({ email: email })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={this.state.email}
                                autoCorrect={false} />
                        </Item>

                        <Item>
                            <Input
                                placeholder="Enter your password"
                                onChangeText={(password) => this.setState({ password: password })}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>

                        <Button
                            onPress={this._login.bind(this)}
                            block style={{ backgroundColor: '#c6b689', marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Login</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.navigation.navigate("Forgot")}
                            transparent style={{ marginTop: 15 }}>
                            <Text>Forgot your password?</Text>
                        </Button>

                        <Text style={{color: 'red', marginTop: 15}}>{this.state.error}</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 10, paddingBottom: 20 }}>
                            <Text> Don't have an account? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Signup")}>
                                <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
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
    logoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    logo:{
        width: 150,
        height: 150
    }
});
