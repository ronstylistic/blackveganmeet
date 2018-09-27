import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert, Image, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, Item, Input, Label, Button, Icon, Thumbnail } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';

import firebase from 'react-native-firebase';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile: {},
            activeIndex: 0
        }

        this.db = firebase.firestore();
        this.uid = firebase.auth().currentUser.uid;
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='My Profile' />
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

    componentWillMount() {
        //this.getProfile();

        this.db.collection("Users").doc(this.uid).onSnapshot((doc) => {
            this.setState({ profile: doc.data() })
        });
    }
    componentWillUnmount() {

    }

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderSection = () => {

        if (this.state.activeIndex == 0) {
            return (
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <Item fixedLabel last>
                            <Label>Firstname</Label>
                            <Input
                                value={this.state.profile.firstname}
                                disabled={true} />
                        </Item>

                        <Item fixedLabel last>
                            <Label>Lastname</Label>
                            <Input
                                value={this.state.profile.lastname}
                                disabled={true} />
                        </Item>

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
                            <Label>For</Label>
                            <Input
                                value={this.state.profile.for}
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
            );
        }
        else if(this.state.activeIndex == 1){
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

                </View>
            );
        }
    }


    render() {

        if (this.state.loading) return <Loader />

        return (
            <Container>
                <Content contentContainerStyle={styles.container} >
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Thumbnail source={require('../../assets/profile.png')} />
                            </View>

                            <View style={{ flex: 3 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}> {this.state.profile.firstname + ' ' + this.state.profile.lastname} </Text>
                                </View>

                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                    <Button
                                        onPress={() => this.props.navigation.navigate('EditProfile', { profile: this.state.profile })}
                                        style={{ flex: 1, marginRight: 5, justifyContent: 'center', height: 30 }}
                                        bordered dark>
                                        <Text>Edit Profile</Text>
                                    </Button>

                                    <Button
                                        onPress={() => this._signout()}
                                        style={{ flex: 1, marginRight: 10, justifyContent: 'center', height: 30 }}
                                        bordered dark>
                                        <Text>Upload Photos</Text>
                                    </Button>

                                </View>

                            </View>
                        </View>

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            borderTopWidth: 1, borderTopColor: '#eae5e5'
                        }}>
                            <Button
                                onPress={() => this.segmentClicked(0)}
                                transparent
                            >
                                <Icon
                                    style={[this.state.activeIndex == 0 ? {} : {color: 'grey'}]}
                                    name="ios-person-outline" />
                            </Button>

                            <Button
                                onPress={() => this.segmentClicked(1)}
                                transparent
                            >
                                <Icon
                                    style={[this.state.activeIndex == 1 ? {} : {color: 'grey'}]}
                                    name="ios-apps-outline" />
                            </Button>
                        </View>
                    </View>
                    
                    {this.renderSection()}
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
