import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';

import { color } from '../../styles/theme';
import constants from '../../styles/constants';

import SmallIcon from "../../assets/image/SmallIcon";
import CaSmell from '../../assets/image/CaSmall';
import UpSmall from '../../assets/image/UpSmall';
import LiSmall from '../../assets/image/LiSmall';
import SoSmall from '../../assets/image/SoSmall';

import onWeb from '../../apis/WebSocket';
import BrailleBinary from '../../utils/BrailleBinary';

const MainPage = ({ navigation, route }) => {
  const image = route?.params?.image;
  const [loading, setLoading] = useState(true);
  const [resultSentence, setResultSentence] = useState();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (image != null) {
      console.log(image);
      onSendData();
    }
  }, [image]);

  const onSendData = async () => {
    if (!image?.uri) {
      console.log('이미지 URI가 제공되지 않았습니다');
      return;
    }

    try {
      setLoading(true);

      const base64Image = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 1,
              },
            ],
          },
        ],
      };

      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.responses && result.responses[0].fullTextAnnotation) {
        const recognizedText = result.responses[0].fullTextAnnotation.text;
        setResultSentence(recognizedText);
        console.log('인식된 텍스트:', recognizedText);
        const data = recognizedText.split("").map(ch => BrailleBinary[ch]).join("");
        console.log(data);
        sendData(data, recognizedText);
      } else {
        setResultSentence('텍스트를 감지하지 못했습니다');
        console.log('이미지에서 텍스트를 감지하지 못했습니다');
      }
    } catch (error) {
      console.error('Google Vision API 오류:', error);
      setResultSentence('텍스트 인식에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const sendData = async (data, str) => {
    const res = await onWeb(data, str);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color.Blue[5]} />
      </View>
    );
  }

  const onPressCamera = () => {
    navigation.navigate("ScanPage", { screen: 'ScanPage' });
  };

  const onPressQuiz = () => {
    navigation.navigate("SelectPage", { screen: 'SelectPage' });
  };

  const onPressUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        console.log("선택된 이미지:", image);

        navigation.navigate("MainPage", { screen: 'MainPage', image });
      }
    } catch (err) {
      console.error("이미지 선택 오류:", err);
    }
  };

  const onPressSpeak = () => {
    if (resultSentence != null) {
      Speech.speak(resultSentence);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <SmallIcon style={styles.logo} />
            <Text style={styles.resultText}>결과</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.row}>
                <Text style={styles.scannedText}>스캔한 글자</Text>
                <TouchableOpacity onPress={() => onPressSpeak()}>
                  <SoSmall />
                </TouchableOpacity>
              </View>
              <Image source={image ? { uri: image.uri } : null} style={styles.blackBox} />
            </View>
            <Text style={styles.resultSentence}>{resultSentence}</Text>
          </View>
          <View style={styles.iconRow}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => onPressCamera()}>
                <CaSmell />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressUpload()}>
                <UpSmall />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <LiSmall />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.quiz}>
          <Text style={styles.resultSentence}>점자에 관한 퀴즈를 풀고 싶다면?</Text>
          <TouchableOpacity style={styles.quizBtn}>
            <Text style={styles.btnFont} onPress={() => onPressQuiz()}>퀴즈 풀기</Text>
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
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between'    
  },
  quiz: {
    backgroundColor: color.White,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: constants.height/8,
    alignItems: 'flex-end'
  },
  quizBtn: {
    backgroundColor: color.Blue[5],
    borderRadius: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnFont: {
    color: color.White,
    fontSize: 16,
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Gray[0],
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  logo: {
    marginRight: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '500',
    color: color.Black,
  },
  card: {
    backgroundColor: color.White,
    borderRadius: 20,
    padding: 20,
    shadowColor: color.Black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scannedText: {
    fontSize: 14,
    color: color.Gray[5],
    fontWeight: '500',
  },
  blackBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  resultSentence: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.Black,
    marginTop: 12,
    marginBottom: 20,
    width: constants.width/1.25
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default MainPage;