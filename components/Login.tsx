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
import { auth } from "../firebase/config";

const Login = ({navigation}: {navigation: any}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        if (auth.currentUser) {
            navigation.navigate("MainTab");
        } else {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log('Logged in with:', user!.email);
                })
                .catch(error => alert(error.message))
        }
    }

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registred with:', user!.email);
            })
            .catch(error => alert(error.message))
    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("MainTab");
            }
        })

        return unsubscribe
    }, []);

    return (
        <View style={styles.mainView}>
            <View style={{marginTop: "40%"}}>
                <View>
                    <TextInput
                        style={styles.inputView}
                        placeholder={"Почта"}
                        autoCapitalize='none'
                        placeholderTextColor="#666666"
                        onSubmitEditing={(event) => {
                            setEmail(event.nativeEvent.text)
                        }}
                        onChangeText={(event) => {
                            setEmail(event)
                        }}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputView}
                        placeholder={"Пароль"}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        placeholderTextColor="#666666"
                        onSubmitEditing={(event) => {
                            setPassword(event.nativeEvent.text);
                        }}
                        onChangeText={(event) => {
                            setPassword(event)
                        }}
                    />
                </View>
            </View>
            <View style={styles.loginView}>
                <Button
                    title="Войти"
                    color={"white"}
                    onPress={() => {
                        handleLogin()
                    }}
                />
            </View>
            <View style={styles.registerView}>
                <Button
                    title="Зарегистрироваться"
                    color={"#ee7700"}
                    onPress={() => {
                        handleSignUp()
                    }}
                />
            </View>
            <View style={styles.logoutView}>
                <Button
                    title="Выйти"
                    color={"#cccccc"}
                    onPress={() => {
                        handleSignOut()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        marginTop: 4,
        marginBottom: 4,
        marginHorizontal: 16,
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: 20,
        height: 36,
        backgroundColor: "white"
    },
    loginView: {
        marginTop: 32,
        marginBottom: 4,
        marginHorizontal: 32,
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: 20,
        height: 36,
        backgroundColor: "#ee7700"
    },
    registerView: {
        marginTop: 4,
        marginBottom: 4,
        marginHorizontal: 32,
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: 20,
        height: 36,
        backgroundColor: "#eeeeee"
    },
    logoutView: {
        marginTop: 4,
        marginBottom: 4,
        marginHorizontal: 32,
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: 20,
        height: 36,
        backgroundColor: "#eeeeee"
    },
    mainView: {
        backgroundColor: "white",
        width: "100%",
        height: "100%"
    },
});

export default Login
