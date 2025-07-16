import axios from 'axios';
import { Alert } from "react-native";

const onWeb = async ( data, strData ) => {
    const webSocket = new WebSocket(`${WEBSOCKET_KEY}`);

    webSocket.onopen = () => {
        console.log("WebSocket is open");

        const message = {
            message: data,
            str: strData
        }

        webSocket.send(JSON.stringify(message));

        webSocket.close();
        return true;
    };

    webSocket.onerror = (error) => {
        webSocket.close();
        console.log(error);
        return false;
    };
};

export default onWeb;