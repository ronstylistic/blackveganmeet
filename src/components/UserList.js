import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Thumbnail} from 'react-native';

export default class UserList extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <Thumbnail square size={100} source={require('../../assets/profile.png')} />
                <View>
                    <Text>
                        {this.props.firstname}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}