import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { color } from '../../styles/theme';
import constants from '../../styles/constants';
import { getStorage, setStorage, removeStorage } from "../../utils/Storage";

import SmallIcon from '../../assets/image/SmallIcon';
import XIcon from '../../assets/image/XIcon';
import OIcon from '../../assets/image/OIcon'

const ResultPage = ({ navigation, route }) => {
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
  
  const onPressNext = async () => {
    await setStorage('STATE', JSON.stringify(Number(stat) + 1));

    if(stat == max) {
      navigation.navigate("FinallyPage", { screen: 'FinallyPage' });
    } else {
      navigation.navigate("QuizPage", { screen: 'QuizPage' });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <SmallIcon></SmallIcon>
            <Text style={styles.title}>{result == '1' ? "정답" : "오답"}</Text>
          </View>
          <Text style={styles.txt}>{result == '1' ? '맞아요' : '틀렸어요'}</Text>
          <View style={styles.btn}>
            {result == '1' ? (
              <TouchableOpacity style={styles.oBtn}>
                <OIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.xBtn}>
                <XIcon />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.textRow}>
            <Text style={styles.count}>{stat}/{max}</Text>
            <Text style={styles.count}>{stat}번째 문제</Text>
          </View>
          <TouchableOpacity style={styles.start} onPress={() => onPressNext()}>
            <Text style={styles.startFont}>다음 문제</Text>
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
  count: {
    color: color.Blue[5],
    fontSize: 14
  },
  textRow: {
    width: constants.width/1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  txt: {
    fontSize: 14,
    fontWeight: '400',
    color: color.Black,
    width: constants.width/1.3
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50
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

export default ResultPage;