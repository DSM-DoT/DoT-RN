import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { color } from '../../styles/theme';
import constants from '../../styles/constants';
import { getStorage, setStorage, removeStorage } from "../../utils/Storage";

import SmallIcon from '../../assets/image/SmallIcon';

const SelectPage = ({ navigation, route }) => {
  const [ focus, setFocus ] = useState(10);

  const onPressStart = async () => {
    await setStorage('MAX', JSON.stringify(focus));
    await setStorage('STATE', JSON.stringify(1));
    await setStorage('COUNT', JSON.stringify(0))
    navigation.navigate("QuizPage", { screen: 'QuizPage' });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <SmallIcon></SmallIcon>
            <Text style={styles.title}>점자 퀴즈</Text>
          </View>
          <View style={styles.bar}>
            <Text style={styles.count}>문제 수</Text>
            <TouchableOpacity onPress={() => setFocus(10)} style={focus==10 ? styles.btnColor : styles.btn}>
              <Text style={focus==10 ? styles.btnFontColor : styles.btnFont}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFocus(20)} style={focus==20 ? styles.btnColor : styles.btn}>
              <Text style={focus==20 ? styles.btnFontColor : styles.btnFont}>20</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFocus(30)} style={focus==30 ? styles.btnColor : styles.btn}>
              <Text style={focus==30 ? styles.btnFontColor : styles.btnFont}>30</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.start} onPress={() => onPressStart()}>
            <Text style={styles.startFont}>퀴즈 시작</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Gray[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    rowGap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: color.White,
    borderRadius: 30,
    width: constants.width/1.1,
    height: constants.height/2.5,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    color: color.Black,
    fontSize: 30,
    fontWeight: 'bold'
  },
  bar: {
    backgroundColor: color.Gray[0],
    borderRadius: 30,
    height: constants.height/20,
    width: constants.width/1.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  count: {
    fontSize: 15,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.White
  },
  btnColor: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.Blue[5]
  },
  btnFont: {
    fontSize: 15,
    color: color.Gray[5]
  },
  btnFontColor: {
    fontSize: 15,
    color: color.White
  },
  start: {
    backgroundColor: color.Blue[5],
    borderRadius: 20,
    width: 120,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startFont: {
    color: color.White,
    fontSize: 16,
    fontWeight: '600'
  }
});

export default SelectPage;