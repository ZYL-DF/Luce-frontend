import {View} from "react-native";
import {Divider, Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {VideoINTF} from "../interfaces/VideoINTF.ts";
import Icon from "react-native-vector-icons/MaterialIcons";
import {getGlobalState} from "../GlobalState.ts";
import createClient from "openapi-fetch";
import * as openapi from "../interfaces/openapi";
const client = createClient<openapi.paths>()

export const VideoInfo = (video: VideoINTF) => {

    const [uploadUserName,setUploadUserName] = useState("null");
    useEffect(() => {
        const getVideoList = async () => {
            // @ts-ignore
            const responses = await client.GET(getGlobalState().server + '/api/user/{id}',{
                params : {
                    path : {
                        id : video.uploadUserId
                    }
                }
            })
            if (responses.response.status === 200) {
                if (responses.data !== undefined && responses.data.data !== undefined) {
                    // @ts-ignore
                    setUploadUserName(responses.data.data.username)
                }
            }
        }

        getVideoList()
    }, []);
    return (
        <View style={{height: "100%", padding: 10}}>
            <View style={{overflow: 'scroll'}}>
                <Text variant="titleLarge" style={{
                    paddingBottom: 10,
                }}>
                    {video.title}
                </Text>
            </View>
            <Divider />
            <View style={{overflow: 'hidden', flexDirection: 'row',paddingBottom : 10,paddingTop : 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name={'smart-display'} size={20}></Icon>
                    <Text variant="bodyMedium" style={{marginLeft: 5}}>{video.playTimes}</Text>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                    <Icon name={'schedule'} size={20}></Icon>
                    <Text variant="bodyMedium"
                          style={{marginLeft: 5}}>{video.uploadDate.toString().split('T')[0]}</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', marginRight: 'auto',paddingBottom : 10,paddingTop : 10}}>
                <Icon name={'person'} size={20}></Icon>
                <Text variant="bodyMedium"
                      style={{marginLeft: 5}}>{uploadUserName}</Text>
            </View>
            <Divider />
            <View style={{overflow: 'scroll',paddingTop : 10}}>
                <Text variant="bodyMedium">
                    {video.detail}
                </Text>
            </View>

        </View>
    )
}
