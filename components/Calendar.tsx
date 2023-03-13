import React, { FC, useEffect, useState, useRef, ReactComponentElement } from "react";
import {
    TextInput,
    View,
    Image,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DataHandler from "../Datahandler";

const Calendar = ({navigation}: {navigation: any}) => {
    const [mode, setMode] = useState<boolean>(false)
    const [moods, setMoods] = useState<any>({});
    const [refreshFlatlist, setRefreshFlatList] = useState<boolean>(false);

    const loadMoods = async () => {
        const cloud_moods = await DataHandler.loadMoods()
        if (cloud_moods !== undefined) {
            setMoods(cloud_moods)
            setRefreshFlatList(!refreshFlatlist)
        }
    }

    const onDateChange = (date) => {
        const day = DataHandler.daysFromStart(date)
        if (!mode) {
            navigation.navigate("Goals", { date: day })
        } else {
            navigation.navigate("Diary", { date: day })
        }
    }
    
    const customDatesStylesCallback = date => {
        switch(moods[DataHandler.daysFromStart(date)]) {
            case 1:
            return {
                style:{
                    backgroundColor: '#ffee93',
                },
            };
            case 2:
            return {
                style:{
                    backgroundColor: '#adf7b6',
                },
            };
            case 3:
            return {
                style:{
                    backgroundColor: '#a0c3d9',
                },
            };
            case 4:
            return {
                style:{
                    backgroundColor: '#ffc09f',
                },
            };
        }
    }
      
    useEffect(() => {
        loadMoods();
        const unsubscribe = navigation.addListener('focus', () => {
            loadMoods();
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <View style = {styles.mainView}>
                <View style={{alignItems:'center', marginBottom: 20, width: "100%", flexDirection:'row', justifyContent:'flex-start'}}>
                    <TouchableOpacity
                        onPress={() => {
                            setMode(!mode)
                        }}
                    >
                    <Image
                        style={styles.checkbox}
                        source={mode ? require("../assets/check-mark-square-icon.png") : require("../assets/square-line-icon.png")}
                    />
                    </TouchableOpacity>
                    <Text style={styles.label}>{mode ? "Дневник" : "Планер"}</Text>
                </View>
                <CalendarPicker
                    selectedDayColor={"#bbbbbb"}
                    onDateChange={onDateChange}
                    customDatesStyles={mode ? customDatesStylesCallback : undefined}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "white",
        width: "100%",
        height: "100%"
    },
    checkbox: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 2,
        marginRight: 2
    },
    label: {
        color: "black",
        fontSize: 14,
        marginLeft: 4
    },
})

export default Calendar
