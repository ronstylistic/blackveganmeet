import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default class Loader extends Component {

  render() {
    return (
        <View style={{backgroundColor:'#f5f5f5', flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#c6b689" />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 70,
        //opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
