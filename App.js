import React from 'react';
import firebase from 'react-native-firebase';
import FreeNav from './src/navigations/FreeNav';
import SecuredNav from './src/navigations/SecuredNav';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if( user ){
        firebase.messaging().subscribeToTopic("chat");
        this.setState({
          loading: false,
          user,
        });
      }
      else{
        firebase.messaging().unsubscribeFromTopic("chat");
      }

    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    
    if (this.state.loading) return null;

    if (this.state.user) return <SecuredNav />;

    return <FreeNav />;
    
  }
}