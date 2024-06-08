import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {VideoINTF} from "../interfaces/VideoINTF.ts";
import {getGlobalState} from "../GlobalState.ts";
import Icon from "react-native-vector-icons/MaterialIcons";

const client = createClient<openapi.paths>()

// @ts-ignore
export function VideoListPage({navigation}) {

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
            // console.log(videoList)
            // console.log(getGlobalState().server + '/image/' + '1/1.jpg')
        })
    }, []);

    const handleCardPress = (videoInfo: VideoINTF) => {
        console.log(videoInfo)
        navigation.navigate('Video', {videoInfo})
    }

    return (
        <View style={{"height": "100%"}}>
            <ScrollView style={{"height": "100%"}} contentContainerStyle={{alignItems: "center"}}>
                {videoList.map((video, index) => (
                    <Card key={index}
                          onPress={() => handleCardPress(video)}
                          style={{
                              width: "90%",
                              height: "auto",
                              marginTop: 10,
                              marginBottom: 10
                          }}>

                        <Card.Cover source={{uri: getGlobalState().server + '/image/' + video.coverUrl}} style={{borderBottomLeftRadius : 0,borderBottomRightRadius : 0,borderRadius : 10}}/>
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


export default VideoListPage;
