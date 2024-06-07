import React, {useEffect, useState} from 'react';
import {Image, ScrollView, ToastAndroid, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {VideoINTF} from "../interfaces/VideoINTF.ts";
import {getGlobalState} from "../GlobalState.ts";
import Icon from "react-native-vector-icons/MaterialIcons";
import {VideoPlayer} from "../components/VideoPlayer.tsx";

const client = createClient<openapi.paths>()

export function HomePage() {

    const [videoList, setVideoList] = useState<VideoINTF[]>([])

    useEffect(() => {
        const getVideoList = async () => {
            // @ts-ignore
            const responses = await client.GET(getGlobalState().server + '/api/video/')
            if (responses.response.status === 200) {
                if (responses.data !== undefined && responses.data.data !== undefined) {
                    // @ts-ignore
                    setVideoList(responses.data.data)
                }
            }
        }

        getVideoList().then(() => {
            console.log(videoList)
            console.log(getGlobalState().server + '/image/' + '1/1.jpg')
        })
    }, []);
    return (
        <View style={{"height": "100%"}}>
            {/*<VideoPlayer videoUrl={'2/2.m3u8'}/>*/}
            <ScrollView style={{"height": "100%"}} contentContainerStyle={{alignItems: "center"}}>
                {videoList.map((video, index) => (
                    <Card key={index}
                          style={{
                              width: "90%",
                              height: "auto",
                              marginTop: 10,
                              marginBottom: 10
                          }}>

                        <Card.Cover source={{uri: getGlobalState().server + '/image/' + video.coverUrl}}/>
                        <Card.Content style={{padding: 5, width: "100%", flexDirection: 'column'}}>
                            <View style={{overflow: 'hidden', width: '100%', marginTop: 5, marginBottom: 5}}>
                                <Text variant="titleMedium">{video.title}</Text>
                            </View>
                            <View style={{overflow: 'hidden', flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon name={'smart-display'} size={20}></Icon>
                                    <Text variant="bodyMedium" style={{marginLeft: 5}}>{video.playTimes}</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                                    <Icon name={'schedule'} size={20}></Icon>
                                    <Text variant="bodyMedium"
                                          style={{marginLeft: 5}}>{video.length.toString()}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    )
}


export default HomePage;
