import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

export default class ProfileImage extends React.PureComponent {
    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'flex-start', height: 100, width: 100, marginHorizontal: 5}}>
                <TouchableOpacity onPress={()=> alert('Press')}>
                    <Image style={{width:this.props.width, height:this.props.height, marginHorizontal: 5 }} source={this.props.source} />   
                    <Text style={{fontSize: 15, textAlign: 'center' }}> { this.props.name }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}