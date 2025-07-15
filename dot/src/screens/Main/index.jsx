import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native';
import SmallIcon from "../../assets/image/SmallIcon";
import { color } from '../../styles/theme';
import CaSmell from '../../assets/image/CaSmall';
import UpSmall from '../../assets/image/UpSmall';
import LiSmall from '../../assets/image/LiSmall';
import SoSmall from '../../assets/image/SoSmall';

const MainPage = ({ navigation, route }) => {
  const image = route?.params?.image;

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
                <Text style={styles.scannedText}>스캔한 점자</Text>
                <TouchableOpacity>
                    <SoSmall />
                </TouchableOpacity>
            </View>
            <Image source={image ? { uri: image.uri } : null} style={styles.blackBox} />
          </View>
          <Text style={styles.resultSentence}>test</Text>
        </View>
        <View style={styles.iconRow}>
            <View style={styles.row}>
                <TouchableOpacity>
                    <CaSmell />
                </TouchableOpacity>
                <TouchableOpacity>
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
