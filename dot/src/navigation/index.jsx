import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from "../screens/Main";
import ScanPage from "../screens/Scan";
import SelectPage from "../screens/Select";
import QuizPage from '../screens/Quiz';
import ResultPage from '../screens/Result';
import FinallyPage from '../screens/Finally';

const Stack = createStackNavigator();

const MainScreen = () => {
    return (
        <Stack.Navigator initialRouteName="ScanPage">
            <Stack.Screen name="ScanPage" component={ScanPage} options={{ headerShown: false }} />
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
            <Stack.Screen name="SelectPage" component={SelectPage} options={{ headerShown: false }} />
            <Stack.Screen name="QuizPage" component={QuizPage} options={{ headerShown: false }} />
            <Stack.Screen name="ResultPage" component={ResultPage} options={{ headerShown: false }} />
            <Stack.Screen name="FinallyPage" component={FinallyPage} options={{headerShown: false }} />
        </Stack.Navigator>
    )
}

export default MainScreen;