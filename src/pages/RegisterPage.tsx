import React from 'react';
import {KeyboardAvoidingView, ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {getGlobalState} from '../GlobalState'
import storage from "../utils/storage.ts";

const client = createClient<openapi.paths>()

// @ts-ignore
export function RegisterPage({navigation}) {
    const [registerInfo, setRegisterInfo] = React.useState({
        username: "",
        emailAddress: "",
        password: "",
    })

    const handleRegisterButton = async () => {
        const prefix = getGlobalState().server
        // @ts-ignore
        const response = await client.POST(prefix + '/api/user/register', {
            body: {
                username: registerInfo.username,
                emailAddress: registerInfo.emailAddress,
                password: registerInfo.password
            }
        })
        if (response.response.status === 200 && response.data !== undefined) {
            if (response.data.data !== undefined) {
                ToastAndroid.showWithGravity("Register successfully", 1000, 1);
                navigation.navigate("LoginScreen");
            } else {
                ToastAndroid.showWithGravity("Register failed", 1000, 1);
            }
        } else {
            ToastAndroid.showWithGravity("Register failed", 1000, 1);
        }
    }

    return (
        <KeyboardAvoidingView style={{"height": "100%"}} behavior={'padding'}>
            <View style={{"height": "100%", alignItems: "center", justifyContent: "center"}}>
                <View style={{height: "10%"}}/>
                <View style={{position: 'absolute', top: "20%", height: "20%", alignItems: "center"}}>
                    <Text variant={"displayMedium"}>
                        Register
                    </Text>
                </View>
                <View style={{position: 'absolute', top: "50%", height: "50%", width: "100%", alignItems: "center"}}>
                    <TextInput label="emailAddress"
                               value={registerInfo.emailAddress}
                               onChangeText={text => setRegisterInfo({
                                   ...registerInfo,
                                   emailAddress: text,
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}>

                    </TextInput>
                    <TextInput label="userName"
                               value={registerInfo.username}
                               onChangeText={text => setRegisterInfo({
                                   ...registerInfo,
                                   username: text,
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}>

                    </TextInput>
                    <TextInput label="password"
                               value={registerInfo.password}
                               onChangeText={text => setRegisterInfo({
                                   ...registerInfo,
                                   password: text,
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}
                    >
                    </TextInput>
                    <Button onPress={handleRegisterButton}
                            mode={'contained'}
                            disabled={registerInfo.password === "" || registerInfo.username === "" || registerInfo.emailAddress === ""}
                            style={{"width": "60%", margin: 30}}>
                        注册
                    </Button>

                    <Button onPress={() => {
                        navigation.navigate("LoginScreen")
                    }}
                            mode={'text'}
                            style={{"width": "60%", margin: 30}}>
                        已有账号,去登录
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


export default RegisterPage;
