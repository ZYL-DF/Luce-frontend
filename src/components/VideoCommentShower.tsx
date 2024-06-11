import {KeyboardAvoidingView, ScrollView, ToastAndroid, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import React, {useState} from "react";
import {CommentINTF} from "../interfaces/CommentINTF.ts";
import {Button, Divider, PaperProvider, Portal, Text, TextInput, Modal} from "react-native-paper";
import createClient from "openapi-fetch";
import * as openapi from "../interfaces/openapi";
import {getGlobalState} from "../GlobalState.ts";
import storage from "../utils/storage.ts";

const client = createClient<openapi.paths>()
export const VideoCommentShower = ({videoId}: { videoId: number }) => {
    const [commentList, setCommentList] = useState<CommentINTF[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [userId, setUserId] = useState(0);
    useFocusEffect(React.useCallback(() => {
        storage.load({
            key: "loginState",
        }).then(ret => {
            setUserId(ret.id)
        })
        const getCommentList = async () => {
            // @ts-ignore
            const responses = await client.GET(getGlobalState().server + '/api/video/comments/{videoId}', {
                params: {
                    path: {
                        videoId: videoId
                    }
                }
            })
            if (responses.response.status === 200) {
                if (responses.data !== undefined && responses.data.data !== undefined) {
                    // @ts-ignore
                    setCommentList(responses.data.data)
                }
            }
            // commentList.sort((a, b) => {
            //     return a.date.getTime() > b.date.getTime() ? 1 : -1;
            // })
        }
        getCommentList()
    }, []))

    const sendComment = () => {
        storage.load({
            key: "loginState",
        }).then(async (ret) => {
            // @ts-ignore
            const responses = await client.POST(getGlobalState().server + '/api/video/comment', {
                body: {
                    videoId: videoId,
                    userId: userId,
                    comment: newComment
                }
            })
            if (responses.response.status === 200) {
                if (responses.data !== undefined && responses.data.data !== undefined) {
                    // @ts-ignore
                    setCommentList(responses.data.data)
                    setNewComment("")
                    ToastAndroid.showWithGravity("评论成功", 1000, 1);
                } else {
                    ToastAndroid.showWithGravity("评论失败", 1000, 1);
                }
            } else {
                ToastAndroid.showWithGravity("评论失败", 1000, 1);
            }
        })
    }

    return (
        <KeyboardAvoidingView style={{height: "100%"}} behavior="padding">
            <Divider/>
            <ScrollView style={{position: 'absolute', "height": "90%",width:"100%"}} contentContainerStyle={{alignItems: "center"}}>
                {commentList.map((comment, index) => (
                    <View key={index} style={{height: 'auto', width: '100%', padding: 5}}>
                        <View style={{"height": "auto", flexDirection: "row"}}>
                            <View style={{
                                height: 30,
                                width: 30,
                                borderRadius: 60,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#8699f8",
                            }}>
                                <Text variant={'titleLarge'} style={{color: 'white'}}>
                                    {comment.userName.at(0)}
                                </Text>
                            </View>
                            <View style={{marginLeft: 10}}>
                                <Text variant={'titleMedium'} style={{flex: 1, marginBottom: 5}}>
                                    {comment.userName}
                                </Text>
                                <Text variant={'bodyMedium'} style={{flex: 1}}>
                                    {comment.comment}
                                </Text>
                                <Text variant={'labelSmall'} style={{color: 'gray', flex: 0.5}}>
                                    {comment.date.toString().split('T')[0] + " " +
                                        comment.date.toString().split('T')[1].split('.')[0]}
                                </Text>

                            </View>
                        </View>
                        <Divider/>
                    </View>
                ))}
            </ScrollView>

            <View style={{position: "absolute", width: "100%", height: "10%", bottom: 0, flexDirection: 'row'}}>
                <Divider/>
                <TextInput value={newComment}
                           onChangeText={text => setNewComment(text)}
                           multiline={true}
                           placeholder={"来一条友善的评论吧"}
                           style={{width: '80%'}}>

                </TextInput>
                <Button style={{width: '20%', borderRadius: 0}} onPress={sendComment}>
                    发送
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}
