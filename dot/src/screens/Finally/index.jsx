import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { color } from '../../styles/theme';
import constants from '../../styles/constants';
import { getStorage, setStorage, removeStorage } from "../../utils/Storage";

import SmallIcon from '../../assets/image/SmallIcon';

const FinallyPage = ({ navigation, route }) => {
  const [result, setResult] = useState();
  const [max, setMax] = useState();
  const [stat, setStat] = useState();
  const [count, setCount] = useState();
  
  useEffect(() => {
    getData();
  },[]);
  
  const getData = async () => {
    setMax(await getStorage('MAX'));
    setStat(await getStorage('STATE'));
    setResult(await getStorage('RESULT'));
    setCount(await getStorage('COUNT'));
  }

  const onPressNext = () => {
    navigation.navigate("ScanPage", { screen: 'ScanPage' });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <SmallIcon></SmallIcon>
            <Text style={styles.title}>결과</Text>
          </View>
          <View style={styles.btn}>
            <Text style={styles.score}>{100/max * count}점</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.count}>{max}문제 중 {count}문제 정답</Text>
          </View>
          <TouchableOpacity style={styles.start} onPress={() => onPressNext()}>
            <Text style={styles.startFont}>돌아가기</Text>
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
  score: {
    fontSize: 40,
    fontWeight: '600',
    color: color.White
  },
  count: {
    color: color.Blue[5],
    fontSize: 14
  },
  textRow: {
    width: constants.width/1.3,
    flexDirection: 'row',
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
    height: constants.height/2,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    color: color.Black,
    fontSize: 30,
    fontWeight: 'bold'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.Blue[3],
    width: constants.width/1.8,
    borderRadius: 20,
    height: 170
  },
  xBtn: {
    backgroundColor: color.Red[0],
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  oBtn: {
    backgroundColor: color.Green[0],
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
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

export default FinallyPage;