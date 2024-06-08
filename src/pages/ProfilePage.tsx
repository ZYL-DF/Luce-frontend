import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import storage from "../utils/storage.ts";

const client = createClient<openapi.paths>()

export function ProfilePage({setIsSignedIn}: { setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [userInfo, setUserInfo] = useState({
        id: 0,
        // @ts-ignore
        email: "example@example.com",
        // @ts-ignore
        name: "Unknown",
    })
    useEffect(() => {
        storage.load({
            key: 'loginState'
        }).then(ret => {
            setUserInfo({
                id: ret.id,
                email: ret.email,
                name: ret.name,
            })
        })
    }, []);

    const handleLogOut = () => {
        storage.remove({
            key: 'loginState',
        }).then(() => setIsSignedIn(false))
    }

    return (
        <View style={{height: "100%"}}>
            <View style={{height: "100%", alignItems: "center"}}>
                <View style={{
                    top: "10%",
                    height: 100,
                    width: 100,
                    borderRadius: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#8699f8",
                    marginBottom: 20,
                }}>
                    <Text variant={'displayMedium'} style={{color: 'white'}}>
                        {userInfo.name.at(0)}
                    </Text>
                </View>
                <Text variant={'displaySmall'} style={{top: "10%", height: "8%"}}>
                    {userInfo.name}
                </Text>
                <Text variant={'labelMedium'} style={{top: "10%", height: "10%"}}>
                    {userInfo.email}
                </Text>
                <Button mode={'contained'} style={{position: 'absolute', bottom: "10%", width: '30%'}}
                        onPress={handleLogOut}>
                    Log out
                </Button>
            </View>
        </View>
    )
}


export default ProfilePage;
