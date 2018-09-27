import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert, Image, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, Item, Input, Label, Button, Thumbnail } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';

import firebase from 'react-native-firebase';

export default class ViewProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: {}
        }

        this.db = firebase.firestore();
        this.user = firebase.auth().currentUser;
    }
    
    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle={navigation.state.params.firstname + " 's Profile"}/>
        )
    });

    _signout() {
        
        firebase.auth().signOut().then(() => {
            AsyncStorage.removeItem('currenUser');
        })
        .catch(error => {
            const { code, message } = error;
            Alert.alert('Error: ' + code, message);
        })
    }

    componentWillMount(){

        this.db.collection("Users").doc(this.props.navigation.state.params.userId).onSnapshot((doc) => {
            this.setState({profile: doc.data()});
            this.setState({loading: false});
        });

        const ref = this.db.collection("Views").doc(this.props.navigation.state.params.userId);
        
        ref.get().then((doc) => {

            if(!doc.exists) {
                ref.set({
                    _id: this.props.navigation.state.params.userId
                });
            }
            
            ref.collection('Viewers').doc(this.user.uid).get()
            .then((viewerDoc) => {

                if (!viewerDoc.exists ){

                    ref.collection('Viewers').doc(this.user.uid).set({
                        _id: this.user.uid,
                        date_created: Date.now()
                    })
                    .catch((error) => {
                        const { code, message } = error;
                        Alert.alert('Error: ' + code, message);
                    });
                }
            })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert('Error: ' + code, message);
            });
           
        }).catch((error) => {
            const { code, message } = error;
            Alert.alert('Error: ' + code, message);
        })
    }
    
    componentWillUnmount() {
        
    }
    render() {
        
        const navigation = this.props.navigation;
        const params = this.props.navigation.state.params;

        if(this.state.loading) return <Loader />
        return (
            
            <Container>
                <Content contentContainerStyle={styles.container} >
                    <View style={{paddingTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Thumbnail source={require('../../assets/profile.png')} />
                            </View>

                            <View style={{flex: 3}}>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 16}}> { this.state.profile.firstname + " " + this.state.profile.lastname } </Text>
                                    
                                </View>

                                <View style={{flexDirection: 'row', paddingTop: 10}}>
                                    <Button
                                        onPress={() => navigation.navigate('SendMessage', { receiver: params.userId, firstname: params.firstname, lastname: params.lastname })}
                                        style={{flex: 1, marginRight: 5, marginRight: 10, justifyContent: 'center', height: 30}} 
                                        bordered dark>
                                        <Text>Send Message</Text>
                                    </Button>
                                    
                                </View>
                                
                            </View>
                        </View>
                            
                    </View>

                    <View style={{flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10}}>
                        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                            <Item fixedLabel last>
                                <Label>Age</Label>
                                <Input
                                    value={this.state.profile.age}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Location</Label>
                                <Input
                                    value={this.state.profile.location}
                                    multiline={true}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Profession</Label>
                                <Input
                                    value={this.state.profile.profession}
                                    multiline={true}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Height</Label>
                                <Input
                                    value={this.state.profile.height}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Education</Label>
                                <Input
                                    value={this.state.profile.education} 
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Do you have children?</Label>
                                <Input
                                    value={this.state.profile.doYouHaveChildren}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>For</Label>
                                <Input
                                    value={this.state.profile.for}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Body Type</Label>
                                <Input
                                    value={this.state.profile.bodyType}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Personality</Label>
                                <Input
                                    value={this.state.profile.bodyType}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Religion</Label>
                                <Input
                                    value={this.state.profile.religion}
                                    disabled={true} />
                            </Item>
                            
                            <Item fixedLabel last>
                                <Label>Smoker</Label>
                                <Input
                                    value={this.state.profile.smoker}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Ethnicity</Label>
                                <Input
                                    value={this.state.profile.ethnicity} 
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>I am seeking a</Label>
                                <Input
                                    value={this.state.profile.iamSeekingA} 
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Do you want children?</Label>
                                <Input
                                    value={this.state.profile.doYouWantChildren}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Marital Status</Label>
                                <Input
                                    value={this.state.profile.maritalStatus}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Do you drink?</Label>
                                <Input
                                    value={this.state.profile.doYouDrink}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Do you do drugs?</Label>
                                <Input
                                    value={this.state.profile.doYouDrugs}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Do you have a car?</Label>
                                <Input
                                    value={this.state.profile.doYouHaveaCar}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Hair</Label>
                                <Input
                                    value={this.state.profile.hairColor} 
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Eye Color</Label>
                                <Input
                                    value={this.state.profile.eyeColor} 
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Pets</Label>
                                <Input
                                    value={this.state.profile.pets}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Gender</Label>
                                <Input
                                    value={this.state.profile.gender}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>Longest Relationship</Label>
                                <Input
                                    value={this.state.profile.longestRelationShip}
                                    disabled={true} />
                            </Item>

                            <Item fixedLabel last>
                                <Label>How ambitious are you?</Label>
                                <Input
                                    value={this.state.profile.howAmbitious} 
                                    disabled={true} />
                            </Item>

                            <Item stackedLabel>
                                <Label>About Me</Label>
                                <Input
                                    value={this.state.profile.aboutMe}
                                    multiline={true}
                                    disabled={true} />
                            </Item>

                        </ScrollView>
                    </View>
                    
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
