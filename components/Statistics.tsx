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
    Dimensions,
} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { Page } from "../Datahandler";
import { LineChart } from "react-native-chart-kit";

import DataHandler from "../Datahandler";
import moment from "moment";

const defaultMoods = () => {
    const recentMoods: number[] = []
    const day = 0
    for (let i: number = day - 30; i <= day; ++i) {
        recentMoods.push(0)
    }
    return recentMoods
}

const defaultDays = () => {
    const day = DataHandler.daysFromStart(moment())
    const days: string[] = []
    const recentMoods: number[] = []
    for (let i: number = day - 30; i <= day; ++i) {
        days.push("")
    }
    return days
}

const Statistics = ({navigation}: {navigation: any}) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [moods, setMoods] = useState<any>({});
    const [rerender, setRerender] = useState<boolean>(false);
    const [days, setDays] = useState<string[]>(defaultDays())
    const [recentMoods, setRecentMoods] = useState<number[]>(defaultMoods())
    const [refreshFlatlist, setRefreshFlatList] = useState<boolean>(false);

    const loadMoods = async () => {
        const cloud_moods = await DataHandler.loadMoods()
        if (cloud_moods !== undefined) {
            setMoods(cloud_moods)
            setRefreshFlatList(!refreshFlatlist)
        }
        getMoods()
    }

    const loadPages = async () => {
        const pages = await DataHandler.loadPages()
        if (pages !== undefined) {
            setPages(pages)
            setRefreshFlatList(!refreshFlatlist)
        }
    }

    const getMoods = () => {
        const day = DataHandler.daysFromStart(moment())
        const days: string[] = []
        const recentMoods: number[] = []
        for (let i: number = day - 30; i <= day; ++i) {
            days.push("")
            recentMoods.push(moods[i] ?? 0)
        }
        setDays(days)
        setRecentMoods(recentMoods)
        setRerender(!rerender)
    }

    useEffect(() => {
        loadMoods();
        const unsubscribe = navigation.addListener('focus', () => {
            getMoods()
        });
        loadPages()
    }, []);
    
    return (
        <>
            <View style = {styles.mainView}>
                <Text style={styles.titleLabel}>Изменение настроения</Text>
                <View id={rerender ? "true" : "false"}>
                <LineChart
                    data={{
                    labels: days,
                    datasets: [
                        {
                        data: recentMoods
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 16}
                    height={rerender ? 200: 199}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(25, 25, 25, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(25, 25, 25, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "0",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        marginHorizontal: 8,
                        borderRadius: 4
                    }}
                />
                </View>
                <Text style={styles.titleLabel}>Статьи</Text>
                <FlatList
                    data={pages}
                    extraData={refreshFlatlist}
                    renderItem={({ item, index }) => 
                        <TouchableOpacity
                            style={styles.articleView}
                            onPress={() => {
                                navigation.navigate("Article", {page: item});
                            }}
                            >
                            <Text style={styles.label}>{item.id}</Text>
                        </TouchableOpacity>
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
    label: {
        color: "black",
        fontSize: 16,
        marginVertical: 4,
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
    articleView: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 4,
        heigth: 30,
        backgroundColor: "#eeeeee",
        borderRadius: 8,
    },
})

export default Statistics
