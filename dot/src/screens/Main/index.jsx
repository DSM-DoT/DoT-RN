import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as Speech from 'expo-speech';
import SmallIcon from "../../assets/image/SmallIcon";
import { color } from '../../styles/theme';
import CaSmell from '../../assets/image/CaSmall';
import UpSmall from '../../assets/image/UpSmall';
import LiSmall from '../../assets/image/LiSmall';
import SoSmall from '../../assets/image/SoSmall';

import onUploadImg from '../../apis/uploadImg';

const MainPage = ({ navigation, route }) => {
  const image = route?.params?.image;
  const state = route?.params?.state;
  const [loading, setLoading] = useState(true);
  const [resultSentence, setResultSentence] = useState();
  const formData = new FormData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(image != null) {
      console.log(image);
      onSendData();
    }
  }, [image])

  const onSendData = async () => {
    let data = {};

    if(state == 'select') {
      data = {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: image.name || 'photo.jpg',
      }
    } else if(state == 'photo') {
      data = {
        uri: image.uri,
        type: image.format=='.jpg' ? 'image/jpg' : 'image/jpeg',
        name: 'photo.jpg'
      }
    }

    if(data) {
      formData.append("image", data);
    } else {
      formData.append("image", "");
    }

    const res = await onUploadImg(formData);
    if(res) {
      setResultSentence(res);
    }
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
  }

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
    if(resultSentence != null) {
      Speech.speak(resultSentence);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Gray[0],
    paddingTop: 40,
    paddingHorizontal: 20,
    rowGap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Gray[0],
  },
  row: {
    flexDirection: 'row',
    gap: 10
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
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default MainPage;
