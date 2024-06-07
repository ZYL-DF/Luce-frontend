import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {getGlobalState} from '../GlobalState'
import storage from "../utils/storage.ts";
const client = createClient<openapi.paths>()
export function ProfilePage() {

    return (
        <View style={{"height": "100%"}}>
            <View style={{"height": "100%", alignItems: "center", justifyContent: "center"}}>
                <View style={{height: "10%"}}/>
                <View style={{top: "10%", height: "20%",  alignItems: "center"}}>
                    <Text variant={"displayMedium"}>
                        Profile
                    </Text>
                    <Text variant={"titleSmall"}>
                        个人页
                    </Text>
                </View>
            </View>
        </View>
    )
}


export default ProfilePage;
