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
    ScrollView,
} from 'react-native';
import DataHandler from "../Datahandler";

const Diary = ({route, navigation}: {route: any, navigation: any}) => {
    const [moods, setMoods] = useState<any>({});
    const [isConfused, setIsConfused] = useState<number>(0);
    const [isHappy, setIsHappy] = useState<number>(4);
    const [isUpset, setIsUpset] = useState<number>(0);
    const [isAngry, setIsAngry] = useState<number>(0);
    const [text, setText] = useState<string>("");

    const loadMoods = async () => {
        const cloud_moods = await DataHandler.loadMoods()
        if (cloud_moods !== undefined) {
            const mood = cloud_moods[route.params.date]
            switch (mood) {
                case 1: {
                    setIsConfused(4)
                    setIsHappy(0)
                    setIsUpset(0)
                    setIsAngry(0)
                    break
                }
                case 2: {
                    setIsHappy(4)
                    setIsConfused(0)
                    setIsUpset(0)
                    setIsAngry(0)
                    break
                }
                case 3: {
                    setIsConfused(0)
                    setIsHappy(0)
                    setIsUpset(4)
                    setIsAngry(0)
                    break
                }
                case 4: {
                    setIsConfused(0)
                    setIsHappy(0)
                    setIsUpset(0)
                    setIsAngry(4)
                    break
                }
            }
            setMoods(cloud_moods)
        }
    }

    const loadDiaries = async () => {
        await DataHandler.loadDiaries()
        setText(DataHandler.getDiary(route.params.date))
    }

    const setDiaryText = (text: string) => {
        DataHandler.setDiary(route.params.date, text)
    }

    const setMood = (mood: number) => {
        moods[route.params.date] = mood
        setMoods(moods)
        DataHandler.setMoods(moods)
        switch (mood) {
            case 1: {
                setIsConfused(4)
                setIsHappy(0)
                setIsUpset(0)
                setIsAngry(0)
                break
            }
            case 2: {
                setIsHappy(4)
                setIsConfused(0)
                setIsUpset(0)
                setIsAngry(0)
                break
            }
            case 3: {
                setIsConfused(0)
                setIsHappy(0)
                setIsUpset(4)
                setIsAngry(0)
                break
            }
            case 4: {
                setIsConfused(0)
                setIsHappy(0)
                setIsUpset(0)
                setIsAngry(4)
                break
            }
        }
    }

    useEffect(() => {
        loadMoods();
        loadDiaries();
    }, []);

    return (
        <>
            <View style = {styles.mainView}>
                <ScrollView>
                    <Text style={styles.titleLabel}>
                        Каким был твой день?
                    </Text>
                    <View style={{marginVertical: 4, alignItems:'center', width: "100%", flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity
                            style={[{marginLeft: 20, borderRadius: 40, borderColor: "#888888"}, {borderWidth: isConfused}]}
                            onPress={() => {
                                setMood(1)
                            }}
                            >
                            <Image
                                style={styles.confused}
                                source={require("../assets/confused-line-icon.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{borderRadius: 40, borderColor: "#888888"}, {borderWidth: isHappy}]}
                            onPress={() => {
                                setMood(2)
                            }}
                            >
                            <Image
                                style={styles.happy}
                                source={require("../assets/smiling-line-icon.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{borderRadius: 40, borderColor: "#888888"}, {borderWidth: isUpset}]}
                            onPress={() => {
                                setMood(3)
                            }}
                            >
                            <Image
                                style={styles.upset}
                                source={require("../assets/crying-line-icon.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{marginRight: 20, borderRadius: 40, borderColor: "#888888"}, {borderWidth: isAngry}]}
                            onPress={() => {
                                setMood(4)
                            }}
                            >
                            <Image
                                style={styles.angry}
                                source={require("../assets/angry-face-icon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleLabel}>
                        Дневник
                    </Text>
                    <TextInput
                        style={styles.diaryInput}
                        multiline={true}
                        defaultValue={text}
                        placeholder={"Сегодня..."}
                        onChangeText={(event) => {
                            setDiaryText(event)
                        }}
                    />
                </ScrollView>
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
    confused: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ffee93",
    },
    happy: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#adf7b6",
    },
    upset: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#a0c3d9",
    },
    angry: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ffc09f",
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
    diaryInput: {
        color: "#101000",
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
    }
})

export default Diary
