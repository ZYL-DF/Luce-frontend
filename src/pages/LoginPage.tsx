import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {getGlobalState} from '../GlobalState'
import storage from "../utils/storage.ts";

const client = createClient<openapi.paths>()

export function LoginPage({setIsSignedIn}: { setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        <View style={{"height": "100%"}}>
            <View style={{"height": "100%", alignItems: "center", justifyContent: "center"}}>
                <View style={{height: "10%"}}/>
                <View style={{top: "10%", height: "20%", alignItems: "center"}}>
                    <Text variant={"displayMedium"}>
                        Login
                    </Text>
                </View>
                <View style={{top: "30%", height: "70%", width: "100%", alignItems: "center"}}>
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
                        login
                    </Button>
                </View>
            </View>
        </View>
    )
}


export default LoginPage;
