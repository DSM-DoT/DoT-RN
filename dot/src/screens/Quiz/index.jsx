import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { color } from '../../styles/theme';
import constants from '../../styles/constants';
import { getStorage, setStorage, removeStorage } from "../../utils/Storage";

import SmallIcon from '../../assets/image/SmallIcon';
import XIcon from '../../assets/image/XIcon';
import OIcon from '../../assets/image/OIcon'

import brailleQuiz from "../../utils/QuizData";

const QuizPage = ({ navigation, route }) => {
  const [max, setMax] = useState();
  const [stat, setStat] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    setMax(await getStorage('MAX'));
    setStat(await getStorage('STATE'));
    setCount(await getStorage('COUNT'));
  }

  const onPressData = async (data) => {
    const currentIndex = Number(stat);
    const correctAnswer = brailleQuiz[currentIndex].answer === "O" ? 0 : 1;
  
    if (data === correctAnswer) {
      await setStorage('RESULT', JSON.stringify(1));
      await setStorage('COUNT', JSON.stringify(Number(count) + 1));
    } else {
      await setStorage('RESULT', JSON.stringify(0));
    }
  
    navigation.navigate("ResultPage", { screen: 'ResultPage' });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <SmallIcon></SmallIcon>
            <Text style={styles.title}>OX 문제</Text>
          </View>
          <Text style={styles.txt}>{stat ? brailleQuiz[stat].question : null}</Text>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.xBtn} onPress={() => onPressData(1)}>
              <XIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.oBtn} onPress={() => onPressData(0)}>
              <OIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.count}>{stat}/{max}</Text>
            <Text style={styles.count}>{stat}번째 문제</Text>
          </View>
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
    height: constants.height/2,
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
  }
});

export default QuizPage;