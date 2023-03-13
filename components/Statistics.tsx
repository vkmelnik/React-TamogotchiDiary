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
import { Page } from "../Datahandler";

import DataHandler from "../Datahandler";

const Statistics = ({navigation}: {navigation: any}) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [refreshFlatlist, setRefreshFlatList] = useState<boolean>(false);

    const loadPages = async () => {
        const pages = await DataHandler.loadPages()
        if (pages !== undefined) {
            setPages(pages)
            setRefreshFlatList(!refreshFlatlist)
        }
    }

    useEffect(() => {
        loadPages()
    }, []);
    
    return (
        <>
            <View style = {styles.mainView}>
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
