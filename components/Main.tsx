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
import Stars from "react-native-stars";
import Dialog from "react-native-dialog";
import { Stat } from "../Datahandler";
import moment from 'moment';

import DataHandler from "../Datahandler";

const Main = ({navigation}: {navigation: any}) => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [refreshFlatlist, setRefreshFlatList] = useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogInputValue, setDialogInputValue] = useState<string>("");

    const getDayPercent = () => {
        return 100 * (moment().hours() / 24)
    }

    const getYearPercent = () => {
        return 100 * (moment().dayOfYear() / 366)
    }

    const showDialog = () => {
        setDialogVisible(true);
    };
    
    const handleCancel = () => {
        setDialogVisible(false);
    };
    
    const handleAdd = () => {
        if (dialogInputValue !== "") {
            stats.push({id: dialogInputValue, strength: 5})
            setStats(stats)
            DataHandler.setStats(stats)
        }
        setDialogVisible(false);
    };

    const loadStats = async () => {
        const stats = await DataHandler.loadStats()
        if (stats !== undefined) {
            setStats(stats)
        }
    }

    useEffect(() => {
        loadStats()
    }, []);

    const StatusBar = ({percent} : {percent: number}) => {
        return (
            <View style = {{
                backgroundColor: "white",
                borderColor: "#222222",
                borderWidth: 2,
                borderRadius: 8,
                width: "60%",
                marginBottom: 8
            }}>
                <View style = {{
                    backgroundColor: "#aaaaaa",
                    borderRadius: 6,
                    margin: 2,
                    height: 20,
                    width: percent.toFixed() + "%"
                }}>

                </View>
            </View>
        )
    }

    // Диалог не вынесен наружу, так как в таком случае он закрывается при вводе текста.
    return (
        <>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Новая цель</Dialog.Title>
                <Dialog.Description>
                    Введите название цели
                </Dialog.Description>
                <Dialog.Input onChangeText={value => {setDialogInputValue(value)}}/>
                <Dialog.Button label="Отмена" onPress={handleCancel} />
                <Dialog.Button label="Ок" onPress={handleAdd} />
            </Dialog.Container>
            <View style = {styles.mainView}>
                <Image
                    style={styles.personImage}
                    source={require("../assets/boy-icon.png")}
                />
                <View style={{alignItems:'center', marginHorizontal: 20, flexDirection:'row', justifyContent:'space-between'}}>
                    <StatusBar percent={getDayPercent()}/>
                    <Text style={styles.label}>{"День: " + getDayPercent().toFixed() + "%"}</Text>
                </View>
                <View style={{alignItems:'center', marginHorizontal: 20, flexDirection:'row', justifyContent:'space-between'}}>
                    <StatusBar percent={getYearPercent()}/>
                    <Text style={styles.label}>{"Год: " + getYearPercent().toFixed() + "%"}</Text>
                </View>
                <View style={{alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.titleLabel}>Цели</Text>
                    <TouchableOpacity
                        style={{marginRight: 20}}
                        onPress={() => {
                            showDialog()
                        }}
                        >
                        <Image
                            style={styles.delete}
                            source={require("../assets/addition-color-outline-icon.png")}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={stats}
                    extraData={refreshFlatlist}
                    renderItem={({ item, index }) => 
                        <View style={{alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    const newStats = stats
                                    newStats.splice(index, 1)
                                    setStats(newStats)
                                    DataHandler.setStats(newStats)
                                    setRefreshFlatList(!refreshFlatlist)
                                }}
                                >
                                <Image
                                    style={styles.delete}
                                    source={require("../assets/collapse-minus-icon.png")}
                                />
                            </TouchableOpacity>
                            <Text style={styles.label}>{item.id}</Text>
                            <View style={styles.starsView}>
                                <Stars
                                    half={false}
                                    default={ item.strength }
                                    update={(val)=>{
                                        stats[index] = {id: item.id, strength: val}
                                        setStats(stats)
                                        DataHandler.setStats(stats)
                                    }}
                                    spacing={4}
                                    starSize={10}
                                    count={10}
                                    fullStar={require('../assets/circle-icon.png')}
                                    emptyStar={require('../assets/circle-line-icon.png')}
                                    halfStar={require('../assets/circle-line-icon.png')}
                                />
                            </View>
                        </View>
                    }
                    numColumns={1}              
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
    personImage: {
        height: 120,
        marginTop: 16,
        resizeMode: 'contain',
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20
    },
    delete: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginLeft: 20,
        marginRight: 4
    },
    label: {
        color: "black",
        fontSize: 16,
        marginLeft: 24
    },
    titleLabel: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 24,
        marginBottom: 10,
        marginTop: 20
    },
    starsView: {
        marginRight: 24,
        marginVertical: 10
    },
})

export default Main
