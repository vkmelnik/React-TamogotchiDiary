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
import { FlatList } from "react-native-gesture-handler";
import { Goal } from "../Datahandler"
import DataHandler from "../Datahandler"

const Goals = ({route, navigation}: {route: any, navigation: any}) => {
    const [importantUrgentGoals, setImportantUrgentGoals] = useState<Goal[]>([]);
    const [importantNotUrgentGoals, setImportantNotUrgentGoals] = useState<Goal[]>([]);
    const [notImportantUrgentGoals, setNotImportantUrgentGoals] = useState<Goal[]>([]);
    const [notImportantNotUrgentGoals, setNotImportantNotUrgentGoals] = useState<Goal[]>([]);

    const loadGoals = async () => {
        const day = route.params.date
        setImportantUrgentGoals(await DataHandler.loadImportantUrgentGoals(day))
        setImportantNotUrgentGoals(await DataHandler.loadImportantNotUrgentGoals(day))
        setNotImportantUrgentGoals(await DataHandler.loadNotImportantUrgentGoals(day))
        setNotImportantNotUrgentGoals(await DataHandler.loadNotImportantNotUrgentGoals(day))
    }

    const saveGoals = async() => {
        const day = route.params.date
        DataHandler.setImportantUrgentGoals(day, importantUrgentGoals)
        DataHandler.setImportantNotUrgentGoals(day, importantNotUrgentGoals)
        DataHandler.setNotImportantUrgentGoals(day, notImportantUrgentGoals)
        DataHandler.setNotImportantNotUrgentGoals(day, notImportantNotUrgentGoals)
    }

    useEffect(() => {
        loadGoals()
    }, []);

    const GoalsView = ({goals, setGoals, title, color}: {goals: any, setGoals: any, title: string, color: string}) => {
        const [refreshFlatlist, setRefreshFlatList] = useState<boolean>(false);

        return (
        <View style={{backgroundColor: color, width: "48%", aspectRatio: 1,}}>
            <View style={{alignItems:'center', marginBottom: 8, width: "100%", flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.listLabel}>{title}</Text>
                    <TouchableOpacity
                        style={{marginRight: 4}}
                        onPress={() => {
                            goals.push({id: "", completed: false})
                            setGoals(goals)
                            setRefreshFlatList(!refreshFlatlist)
                            saveGoals()
                        }}
                        >
                        <Image
                            style={styles.delete}
                            source={require("../assets/addition-color-outline-icon.png")}
                        />
                    </TouchableOpacity>
                </View>
            <FlatList
                data={goals}
                extraData={refreshFlatlist}
                renderItem={({ item, index }) => 
                    <View style={{alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'flex-start'}}>
                        <TouchableOpacity
                            onPress={() => {
                                goals[index].completed = !goals[index].completed 
                                setGoals(goals)
                                setRefreshFlatList(!refreshFlatlist)
                                saveGoals()
                            }}
                            >
                            <Image
                                style={styles.delete}
                                source={item.completed ? require("../assets/check-mark-square-icon.png") : require("../assets/square-line-icon.png")}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.label}
                            placeholder={"Задача"}
                            placeholderTextColor="#bbbbbb"
                            defaultValue={item.id}
                            onSubmitEditing={(event) => {
                                if (event.nativeEvent.text === "") {
                                    goals.splice(index, 1)
                                    setGoals(goals)
                                    setRefreshFlatList(!refreshFlatlist)
                                    saveGoals()
                                } else {
                                    goals[index].id = event.nativeEvent.text
                                    setGoals(goals)
                                    setRefreshFlatList(!refreshFlatlist)
                                    saveGoals()
                                }
                            }}
                        />
                    </View>
                }
                numColumns={1}              
            />
        </View>
        )
    }

    return (
        <>
            <View style = {styles.mainView}>
                <Text style={styles.titleLabel}>Цели</Text>
                <View style={{alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'center'}}>
                    <GoalsView goals={importantUrgentGoals} setGoals={setImportantUrgentGoals} title="Срочно, важно" color="#ffc09f"/>
                    <GoalsView goals={importantNotUrgentGoals} setGoals={setImportantNotUrgentGoals} title="Срочно, неважно" color="#ffee93"/>
                </View>
                <View style={{alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'center'}}>
                    <GoalsView goals={notImportantUrgentGoals} setGoals={setNotImportantUrgentGoals} title="Не срочно, важно" color="#a0c3d9"/>
                    <GoalsView goals={notImportantNotUrgentGoals} setGoals={setNotImportantNotUrgentGoals} title="Не срочно, неважно" color="#adf7b6"/>
                </View>
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
    delete: {
        height: 16,
        width: 16,
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
    listLabel: {
        color: "black",
        fontSize: 12,
        marginLeft: 4,
        marginTop: 4,
    },
    titleLabel: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 24,
        marginBottom: 20,
        marginTop: 20
    },
})

export default Goals
