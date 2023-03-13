import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";

import Main from "./components/Main";
import Goals from "./components/Goals";
import Statistics from "./components/Statistics";
import Diary from "./components/Diary";
import Calendar from "./components/Calendar";
import Article from "./components/Article";
import Login from "./components/Login";
import Icon from 'react-native-ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
  
                if (route.name === 'Main') {
                    iconName = 'ios-home';
                } else {
                    iconName = 'ios-list';
                }
  
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name = "Main" component = {Main} options={{title: 'Главная', headerShown : true}}/>
            <Tab.Screen name = "Calendar" component = {Calendar} options={{title: 'Календарь', headerShown : true}}/>
            <Tab.Screen name = "Statistics" component = {Statistics} options={{title: 'Статистика', headerShown : true}}/>
        </Tab.Navigator>
    )
}

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "Login" component = {Login} options={{title: 'Вход', headerShown : false}}/>
            <Stack.Screen name = "MainTab" component = {TabStack} options={{title: '', headerShown : true}}/>
            <Stack.Screen name = "Article" component = {Article} options={{title: 'Статья', headerShown : true}}/>
            <Stack.Screen name = "Goals" component = {Goals} options={{title: 'Цели', headerShown : true}}/>
            <Stack.Screen name = "Diary" component = {Diary} options={{title: 'Дневник', headerShown : true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;
