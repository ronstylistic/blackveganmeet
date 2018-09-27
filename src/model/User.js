import React, { Component } from 'react';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class User extends Component {

    constructor(props){
        super(props)

        this.state = {
            age: '',
            location: '',
            profession: '',
            height: '',
            education: '',
            doYouHaveChildren: '',
            for: '',
            bodyType: '',
            personality: '',
            religion: '',
            smoker: '',
            ethnicity: '',
            iamSeekingA: '',
            doYouWantChildren: '',
            maritalStatus: '',
            doYouDrink: '',
            doYouDrugs: '',
            doYouHaveaCar: '',
            hairColor: '',
            eyeColor: '',
            pets: '',
            gender: '',
            longestRelationShip: '',
            howAmbitious: '',
            aboutMe: ''
        };

        this.db = firebase.firestore();
        this.uid = firebase.auth().currentUser.uid;
    }

    updateProfile() {
        alert('ok');
    }


    componentWillMount(){
        this.db.collection("Users").doc(this.uid).onSnapshot((doc) => {
            this.setState(doc.data())
        });
    }
    getProfile () {
        
        this.ref = this.db.collection('Users').doc(this.uid)

        return this.ref.get()
            .then((doc) => {

                if(doc.exists){

                    //this.setState(doc.data())
                    //this.setState({ profile: doc.data() });
                    return this.setState(doc.data());
                }
                
            })
            .catch((error) => {
                throw error;    
            })
    }
}