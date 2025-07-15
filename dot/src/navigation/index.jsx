import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from "../screens/Main";
import ScanPage from "../screens/Scan";

const Stack = createStackNavigator();

const MainScreen = () => {
    return (
        <Stack.Navigator initialRouteName="ScanPage">
            <Stack.Screen name="ScanPage" component={ScanPage} options={{ headerShown: false }} />
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default MainScreen;