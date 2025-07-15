import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { color } from '../../styles/theme';
import constants from '../../styles/constants';

const MainPage = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={Styles.container}></View>
        </TouchableWithoutFeedback>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: constants.width,
        height: constants.height,
        backgroundColor: color.White,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default MainPage;