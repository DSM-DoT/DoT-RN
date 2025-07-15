import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../../styles/theme";
import constants from "../../styles/constants";

import Logo from "../../assets/image/Logo";

const Splash = ({navigation}) => {
    return (
        <View style={Styles.container}>
            <Logo style={Styles.img}></Logo>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: constants.width,
        height: constants.height,
        backgroundColor: color.White,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: constants.width/3
    },
    text: {
        marginTop: constants.height/20,
        fontSize: 14,
        color: color.Gray[5]
    }
})

export default Splash;