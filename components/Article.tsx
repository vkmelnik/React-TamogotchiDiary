import React, { FC, useEffect, useState, useRef, ReactComponentElement } from "react";
import {
    TextInput,
    View,
    Image,
    SafeAreaView,
    Button,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';

const Article = ({route, navigation}: {route: any, navigation: any}) => {
    const [title, setTitle] = useState<string>(route.params.page.id);
    const [text, setText] = useState<string>(route.params.page.text);
    const [image, setImage] = useState<string>(route.params.page.image);

    useEffect(() => {
        
    }, []);

    return (
        <>
            <View style = {styles.mainView}>
                <ScrollView>
                    <Text style={styles.titleLabel}>
                        {title}
                    </Text>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#fffffb",
        width: "100%",
        height: "100%"
    },
    text: {
        color: "#101000",
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
    },
    titleLabel: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 20
    },
})

export default Article
