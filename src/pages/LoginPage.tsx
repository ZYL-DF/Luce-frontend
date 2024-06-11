import React from 'react';
import {KeyboardAvoidingView, ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {getGlobalState} from '../GlobalState'
import storage from "../utils/storage.ts";

const client = createClient<openapi.paths>()

// @ts-ignore
export function LoginPage({setIsSignedIn, navigation}: {
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: any
}) {
    const [loginInfo, setLoginInfo] = React.useState({
        emailAddress: "",
        password: "",
    })

    const handleLoginButton = async () => {
        const prefix = getGlobalState().server
        // @ts-ignore
        const response = await client.POST(prefix + '/api/user/login', {
            body: {
                emailAddress: loginInfo.emailAddress,
                password: loginInfo.password
            }
        })
        if (response.response.status === 200 && response.data !== undefined) {
            if (response.data.data !== undefined) {

                await storage.save({
                    key: "loginState",
                    data: {
                        // @ts-ignore
                        token: response.data.data.token,
                        // @ts-ignore
                        id: response.data.data.id,
                        // @ts-ignore
                        email: response.data.data.emailAddress,
                        // @ts-ignore
                        name: response.data.data.username,
                    }
                })
            }

            ToastAndroid.showWithGravity("Login successfully", 1000, 1);
            setIsSignedIn(true)
        } else {
            ToastAndroid.showWithGravity("Login failed", 1000, 1);
        }
    }

    return (
        <KeyboardAvoidingView style={{"height": "100%"}} behavior={'padding'}>
            <View style={{"height": "100%", alignItems: "center", justifyContent: "center"}}>
                <View style={{height: "10%"}}/>
                <View style={{position: 'absolute',top: "20%", height: "20%", alignItems: "center"}}>
                    <Text variant={"displayMedium"}>
                        Luce
                    </Text>
                </View>
                <View style={{top: "30%", height: "60%", width: "100%", alignItems: "center"}}>
                    <TextInput label="emailAddress"
                               value={loginInfo.emailAddress}
                               onChangeText={text => setLoginInfo({
                                   ...loginInfo,
                                   emailAddress: text,
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}>

                    </TextInput>
                    <TextInput label="password"
                               value={loginInfo.password}
                               onChangeText={text => setLoginInfo({
                                   ...loginInfo,
                                   password: text,
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}
                    >
                    </TextInput>
                    <Button onPress={handleLoginButton}
                            mode={'contained'}
                            disabled={loginInfo.password === "" || loginInfo.emailAddress === ""}
                            style={{"width": "60%", margin: 30}}>
                        登录
                    </Button>

                    <Button onPress={() => {
                        navigation.navigate("RegisterScreen")
                    }}
                            mode={'text'}
                            style={{"width": "60%", margin: 30}}>
                        没有账号,去注册
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


export default LoginPage;
