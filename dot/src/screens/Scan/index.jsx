import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '../../styles/customText';
import constants from '../../styles/constants';
import { color } from '../../styles/theme';
import CameraIcon from '../../assets/image/CameraIcon';
import UploadIcon from '../../assets/image/UploadIcon';

const { width, height } = Dimensions.get('window');

const ScanPage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const onPressPermission = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        '카메라 권한 필요',
        '설정에서 카메라 권한을 허용해주세요.',
        [
          { text: '취소', style: 'cancel' },
          { text: '설정으로 이동', onPress: () => Linking.openURL('app-settings:') },
        ]
      );
    } else {
      Linking.openSettings().catch(() => {
        Alert.alert('오류', '설정 화면을 여는 데 실패했습니다.');
      });
    }
  };

  if (!isFocused) return null;

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <LinearGradient colors={[color.Blue[2], color.Blue[6]]} style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <Icon name="camera-off" size={80} color={color.White} />
          <CustomText style={styles.permissionText}>카메라 권한을 허용해주세요</CustomText>
          <TouchableOpacity style={styles.permissionButton} onPress={onPressPermission}>
            <CustomText style={styles.buttonText}>권한 허용하기</CustomText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.cameraView} />

      <View style={styles.bottomSheet}>
        <View style={styles.bottomAlign}>
            <CustomText style={styles.guideText}>
            스캔할 점자를 화면에 들어오도록 해주세요
            </CustomText>
            <CustomText style={styles.warningText}>
            * 영어만 지원 가능 합니다 *
            </CustomText>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.captureButton}>
            <CameraIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <UploadIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  cameraView: {
    height: height * 0.7,
    width: '100%',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: color.Gray[0],
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  bottomAlign: {
    alignItems: 'center'
  },
  guideText: {
    fontSize: 16,
    color: color.Gray[5],
    backgroundColor: color.White,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    textAlign: 'center',
  },
  warningText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
  buttonRow: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 100
  },
  captureButton: {
    backgroundColor: color.Blue[5],
    width: 130,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
    zIndex: 2
  },
  uploadButton: {
    backgroundColor: color.Gray[1],
    width: 130,
    height: 70,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 50,
    zIndex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 22,
    color: color.White,
    marginVertical: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: color.Gray[5],
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: color.White,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScanPage;