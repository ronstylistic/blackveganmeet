import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert, Image, AsyncStorage, ScrollView, ToastAndroid } from 'react-native';
import { Container, Content, Item, Input, Label, Button, Thumbnail, Segment, Picker, Header, Body, Title, Left, Right, Icon, Toast } from 'native-base';
import Loader from '../components/Loader';

import firebase from 'react-native-firebase';

export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.db = firebase.firestore();
        this.uid = firebase.auth().currentUser.uid;


    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header
                androidStatusBarColor='#c6b689'
                style={{ backgroundColor: '#f5f5f5' }}
                noShadow={true}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon style={{ color: '#333' }} name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: '#333' }}>Edit Profile</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => navigation.state.params.handleProfileUpdate()}>
                        <Icon style={{ color: '#c6b689', fontSize: 30 }} name="ios-send" />
                    </Button>
                </Right>
            </Header>
        )
    });

    _updateProfile = () => {
        this.setState({ loading: true });

        this.db.collection("Users").doc(this.uid).update({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            location: this.state.location,
            profession: this.state.profession,
            height: this.state.height,
            education: this.state.education,
            doYouHaveChildren: this.state.doYouHaveChildren,
            for: this.state.for,
            bodyType: this.state.bodyType,
            personality: this.state.personality,
            religion: this.state.religion,
            smoker: this.state.smoker,
            ethnicity: this.state.ethnicity,
            iamSeekingA: this.state.iamSeekingA,
            doYouWantChildren: this.state.doYouWantChildren,
            maritalStatus: this.state.maritalStatus,
            doYouDrink: this.state.doYouDrink,
            doYouDrugs: this.state.doYouDrugs,
            doYouHaveaCar: this.state.doYouHaveaCar,
            hairColor: this.state.hairColor,
            eyeColor: this.state.eyeColor,
            pets: this.state.pets,
            gender: this.state.gender,
            longestRelationShip: this.state.longestRelationShip,
            howAmbitious: this.state.howAmbitious,
            aboutMe: this.state.aboutMe
        }).then(() => {
            this.setState({ loading: false });
            ToastAndroid.show("You successfully updated your profile.", ToastAndroid.LONG);
        })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert('Error: ' + code, message);
            });

        Keyboard.dismiss();
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleProfileUpdate: this._updateProfile });

    }

    componentWillMount() {
        this.setState(this.props.navigation.state.params.profile);
    }

    componentWillUnmount() {

    }

    render() {

        if (this.state.loading) return <Loader />

        return (
            <Container>

                <Content contentContainerStyle={styles.container} >
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Firstname</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(firstname) => this.setState({ firstname: firstname })}
                                    value={this.state.firstname} />
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Lastname</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(lastname) => this.setState({ lastname: lastname })}
                                    value={this.state.lastname} />
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Age</Label>
                                <Input
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    onChangeText={(age) => this.setState({ age: age })}
                                    value={this.state.age} />
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Location</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(location) => this.setState({ location: location })}
                                    multiline={true}
                                    value={this.state.location} />
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Gender</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Male" value="Male" />
                                    <Item label="Female" value="Female" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Profession</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(profession) => this.setState({ profession: profession })}
                                    value={this.state.profession} />
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Height</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.height}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ height: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="< 5' (< 152 cm)" value="< 5 (< 152 cm)" />
                                    <Item label="5'0 (152 cm)" value="5'0 (152 cm)" />
                                    <Item label="5'1 (155 cm)" value="5'1 (155 cm)" />
                                    <Item label="5'2 (157 cm)" value="5'2 (157 cm)" />
                                    <Item label="5'3 (160 cm)" value="5'3 (160 cm)" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Marital Status</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.maritalStatus}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ maritalStatus: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Single" value="Single" />
                                    <Item label="Married" value="Married" />
                                    <Item label="Living Together" value="Living Together" />
                                    <Item label="Divorced" value="Divorced" />
                                    <Item label="Widowed" value="Widowed" />
                                    <Item label="Separated" value="Separated" />
                                    <Item label="Not Single/Not Looking" value="Not Single/Not Looking" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Religion</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.religion}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ religion: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Non-religious" value="Non-religious" />
                                    <Item label="New age" value="New age" />
                                    <Item label="Muslim" value="Muslim" />
                                    <Item label="Jewish" value="Jewish" />
                                    <Item label="Catholic" value="Catholic" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Hair Color</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.hairColor}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ hairColor: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Black" value="Black" />
                                    <Item label="Blond" value="Blond" />
                                    <Item label="Brown" value="Brown" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Eye Color</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.eyeColor}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ eyeColor: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Blue" value="Blue" />
                                    <Item label="Hazel" value="Hazel" />
                                    <Item label="Grey" value="Grey" />
                                    <Item label="Green" value="Green" />
                                    <Item label="Brown" value="Brown" />
                                    <Item label="Other" value="Other" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Ethnicity</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.ethnicity}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ ethnicity: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Caucasian" value="Caucasian" />
                                    <Item label="Black" value="Black" />
                                    <Item label="Hispanic" value="Hispanic" />
                                    <Item label="Indian" value="Indian" />
                                    <Item label="Middle Eastern" value="Middle Eastern" />
                                    <Item label="Native American" value="Native American" />
                                    <Item label="Asian" value="Asian" />
                                    <Item label="Mixed Race" value="Mixed Race" />
                                    <Item label="Other Ethnicity" value="Other Ethnicity" />
                                </Picker>
                            </Item>



                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>I am seeking a</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.iamSeekingA}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ iamSeekingA: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Female" value="Female" />
                                    <Item label="Male" value="Male" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>For</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.for}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ for: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Hang Out" value="Hang Out" />
                                    <Item label="Long Term" value="Long Term" />
                                    <Item label="Dating" value="Dating" />
                                    <Item label="Friends" value="Friends" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Education</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.education}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ education: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="High School" value="High School" />
                                    <Item label="Some College" value="Some College" />
                                    <Item label="Some University" value="Some University" />
                                    <Item label="Associates Degree" value="Associates Degree" />
                                    <Item label="Graduate Degree" value="Graduate Degree" />
                                    <Item label="PhD/Post Doctoral" value="PhD/Post Doctoral" />
                                    <Item label="Bachelors Degree" value="Bachelors Degree" />
                                    <Item label="Masters Degree" value="Masters Degree" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Body Type</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.bodyType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ bodyType: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Prefer not to say" value="Prefer not to say" />
                                    <Item label="Thin" value="Thin" />
                                    <Item label="Athletic" value="Athletic" />
                                    <Item label="Average" value="Average" />
                                    <Item label="A few extra pounds" value="A few extra pounds" />
                                    <Item label="Big & Tall/BBW" value="Big & Tall/BBW" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Personality</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.personality}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ personality: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Adventurer" value="Adventurer" />
                                    <Item label="Artsy" value="Artsy" />
                                    <Item label="Athletic" value="Athletic" />
                                    <Item label="Beach Bum" value="Beach Bum" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Pets</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.pets}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ pets: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="No Pets" value="No Pets" />
                                    <Item label="Cat" value="Cat" />
                                    <Item label="Dog" value="Dog" />
                                    <Item label="Cat & Dog" value="Cat & Dog" />
                                    <Item label="Birds" value="Birds" />
                                    <Item label="Other" value="Other" />
                                </Picker>
                            </Item>


                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Smoker</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.smoker}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ smoker: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="No" value="No" />
                                    <Item label="Ocassionally" value="Ocassionally" />
                                    <Item label="Often" value="Often" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Do you want children?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.doYouWantChildren}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ doYouWantChildren: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Prefer not to say" value="Prefer not to say" />
                                    <Item label="Want children" value="Want children" />
                                    <Item label="Does not want children" value="Does not want children" />
                                    <Item label="Undecided/Open" value="Undecided/Open" />
                                </Picker>
                            </Item>



                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Do you drink?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.doYouDrink}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ doYouDrink: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="No" value="No" />
                                    <Item label="Socially" value="Socially" />
                                    <Item label="Often" value="Often" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Do you have children?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.doYouHaveChildren}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ doYouHaveChildren: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Prefer not to say" value="Prefer not to say" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                    <Item label="All my kids are over 18" value="All my kids are over 18" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Do you do drugs?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.doYouDrugs}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ doYouDrugs: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="No" value="No" />
                                    <Item label="Socially" value="Socially" />
                                    <Item label="Often" value="Often" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Do you have a car?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.doYouHaveaCar}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ doYouHaveaCar: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Prefer not to say" value="Prefer not to say" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>Longest Relationship</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.longestRelationShip}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ longestRelationShip: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Under 1 year" value="Under 1 year" />
                                    <Item label="Over 1 year" value="Over 1 year" />
                                    <Item label="Over 2 years" value="Over 2 years" />
                                    <Item label="Over 3 years" value="Over 3 years" />
                                    <Item label="Over 4 years" value="Over 4 years" />
                                    <Item label="Over 5 years" value="Over 5 years" />
                                    <Item label="Over 6 years" value="Over 6 years" />
                                    <Item label="Over 7 years" value="Over 7 years" />
                                    <Item label="Over 8 years" value="Over 8 years" />
                                    <Item label="Over 9 years" value="Over 9 years" />
                                    <Item label="Over 10 years" value="Over 10 years" />
                                </Picker>
                            </Item>

                            <Item fixedLabel last>
                                <Label style={styles.labelContainer}>How ambitious are you?</Label>
                                <Picker
                                    style={styles.pickerContainer}
                                    mode="dropdown"
                                    selectedValue={this.state.howAmbitious}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ howAmbitious: itemValue })}>

                                    <Item label="SELECT" value="" />
                                    <Item label="Not Ambitious" value="Not Ambitious" />
                                    <Item label="Somewhat Ambitious" value="Somewhat Ambitious" />
                                    <Item label="Ambitious" value="Ambitious" />
                                    <Item label="Very Ambitious" value="Very Ambitious" />
                                </Picker>
                            </Item>

                            <Item stackedLabel>
                                <Label style={styles.labelContainer}>About Me</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(aboutMe) => this.setState({ aboutMe: aboutMe })}
                                    multiline={true}
                                    value={this.state.aboutMe} />
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
    },
    labelContainer: {
        flex: 1,
    },
    pickerContainer: {
        flex: 2.1
    }
});
