import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, BackHandler, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import {Container, Header, Title, Left, Body, Right, Content, Icon, Button, List, ListItem } from 'native-base';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomIcon from '../components/CustomIcon';

import firebase from 'react-native-firebase';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header
                androidStatusBarColor='#c6b689'
                style={{backgroundColor: '#f5f5f5'}} 
                noShadow={true}>
                <Body>
                    <Title style={{color: '#333'}}>Black Vegan Meet</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => console.log('press')}>
                        <Icon name="ios-search-outline" style={{ color: '#c6b689'}} />
                    </Button>
                    <Button transparent onPress={() => console.log('press')}>
                        <Icon name="ios-settings-outline" style={{ color: '#c6b689'}} />
                    </Button>
                </Right>
            </Header>
        )
    });

    componentDidMount() {
        
    }
    componentWillMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        
    }

    handleBackButtonClick() {
    
        BackHandler.exitApp();
        return true;
    }


    render() {

        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <View style={{ flex: 3, justifyContent: 'space-around' }}>

                        <View style={styles.content}>
                            
                            <Button
                                onPress={() => this.props.navigation.navigate("Search")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="search" style={styles.buttonIcon} />

                                <View style={{flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.buttonText}>Search</Text>
                                </View>
                                
                            </Button>
                            

                            <Button
                                onPress={() => this.props.navigation.navigate("Message")}
                                vertical transparent style={styles.button}>
                                <CustomIcon name="message" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Messages</Text>
                            </Button>
                            <Button
                                onPress={() => this.props.navigation.navigate("Viewed")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="view_me" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Viewed Me</Text>
                            </Button>
                        </View>

                        <View style={styles.content}>
                            <Button
                               onPress={()=> this.props.navigation.navigate('Profile')}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="my_profile" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>My Profile</Text>
                            </Button>

                            <Button
                                onPress={() => this.props.navigation.navigate("Nearby")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="nearby_event" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Events</Text>
                            </Button>

                            
                            <Button
                                onPress={() => this.props.navigation.navigate("NearbyRestaurant")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="nearby_restaurant" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Restaurants</Text>
                            </Button>
                          
                        </View>

                        <View style={styles.content}>

                            <Button
                                onPress={() => this.props.navigation.navigate("NearbyGroceryStore")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="nearby_grocery_stores" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Grocery Store</Text>
                            </Button>

                            <Button
                                onPress={() => this.props.navigation.navigate("Meet")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="swipe" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Swipe to Like</Text>
                            </Button>

                            <Button
                                onPress={() => this.props.navigation.navigate("Meet")}
                                vertical transparent style={styles.button} >
                                <CustomIcon name="advice_corner" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Advice Corner</Text>
                            </Button>
                            
                        </View>

                    </View>

                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'flex-start'}}
                        >    
                        
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
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5'
        //alignItems: 'flex-end'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //borderWidth: 1,
        //borderColor: '#000',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 100,
        height: 100,

    },
    buttonIcon: {
        fontSize: 70,
        color: '#c6b689'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333'
    }
});
