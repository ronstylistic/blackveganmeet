import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { Container, Content, Item, Icon, Input, Button, List, ListItem, Header, Thumbnail } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';
import firebase from 'react-native-firebase';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        }

        this.ref = firebase.firestore().collection('Users');
        this.unsubscribe = null;
    }
    
    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='Search' />
        )
    });

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {

        const _users = [];

        querySnapshot.forEach((doc) => {

            const { uid, firstname, lastname } = doc.data(); 

            if(uid != firebase.auth().currentUser.uid){
                
                _users.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    firstname,
                    lastname,
                });
            }
            
        });
      
        this.setState({users: _users});
        this.setState({loading: false});
    }

    _renderItem = ({item}) => {
        return (
            <Item>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('ViewProfile', { userId: item.key, firstname: item.firstname, lastname: item.lastname })}
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
        
        if(this.state.loading) return <Loader />

        return (
            <Container>

                <Content contentContainerStyle={styles.container}>

                    <List dataArray={this.state.users}
                        renderRow={(item) =>
                            <ListItem button onPress={() => this.props.navigation.navigate('ViewProfile', { userId: item.key, firstname: item.firstname, lastname: item.lastname })}>
                                <Thumbnail square source={require('../../assets/profile.png')} />
                                <Text> {item.firstname + ' ' + item.lastname } </Text>
                            </ListItem>
                        }>

                    </List>
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
