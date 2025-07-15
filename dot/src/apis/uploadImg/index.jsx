import axios from 'axios';
import { Alert } from 'react-native';

const onUploadImg = async ( data ) => {
    try {
        const response = await axios.post(`{API_KEY}/ocr`,
            data,
            {
            headers: {
                "Content-Type": 'multipart/form-data',
              },
            }
          );
        if(response.status == 200) {
            console.log(response.data.originalText);
            return true;
        }
    } catch (error) {
        if (error.response) {
            if(error.response.status === 400) {
                Alert.alert('이미지 업로드 오류입니다.');
            }
        } else {
            console.log(error);
            Alert.alert('네트워크 오류입니다.');
        }
        return false;
    }
};  

export default onUploadImg;