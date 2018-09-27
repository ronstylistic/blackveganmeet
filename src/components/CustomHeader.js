import React, { Component } from 'react';
import { Header, Title, Body, Button, Icon, Left, Right } from 'native-base';

export default class CustomHeader extends Component {

    constructor(props){
        super(props);

    }
    render() {
        return (
            <Header
                androidStatusBarColor='#c6b689'
                style={{backgroundColor: '#f5f5f5'}} 
                noShadow={true}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon style={{color: '#333'}} name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: '#333'}}>{ this.props.headerTitle}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}