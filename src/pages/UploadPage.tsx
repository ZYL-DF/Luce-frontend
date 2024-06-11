import React from 'react';
import {Image, KeyboardAvoidingView, NativeModules, Platform, ScrollView, ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import createClient from "openapi-fetch";
import * as openapi from '../Interfaces/openapi'
import {getGlobalState} from '../GlobalState'
import storage from "../utils/storage.ts";
import DocumentPicker from 'react-native-document-picker'
import Video from "react-native-video";
import {useFocusEffect} from "@react-navigation/native";

const client = createClient<openapi.paths>()

// @ts-ignore
export function UploadPage({navigation}: { navigation: any }) {
    const [uploadInfo, setUploadInfo] = React.useState<{
        uploadUserId: number,
        title: string,
        detail: string,
        coverUrl: string,
        videoUrl: string,
        length: number
    }>({
        uploadUserId: 0,
        title: "",
        detail: "",
        coverUrl: "",
        videoUrl: "",
        length: 0
    })

    const [uploadStatus, setUploadStatus] = React.useState(false)
    useFocusEffect(React.useCallback(() => {
        const getUserId = async () => {
            storage.load({
                key: "loginState",
            }).then(ret => {
                setUploadInfo({
                    ...uploadInfo,
                    uploadUserId: ret.id,
                })
            })
        }
        getUserId();
    }, []))
    const handleUploadButton = async () => {

        let formData = new FormData();
        //(Platform.OS === 'android' ? 'file://' : '')
        let cover = {

            uri: uploadInfo.coverUrl,
            type: 'image/png',
            name: 'cover.png'
        };
        let video = {
            uri: uploadInfo.videoUrl,
            type: 'video/mp4',
            name: 'video.mp4'
        };

        formData.append('cover', cover)
        formData.append('video', video)
        formData.append('title', uploadInfo.title)
        formData.append('detail', uploadInfo.detail)
        formData.append('uploadUserId', uploadInfo.uploadUserId)
        formData.append('length', uploadInfo.length)
        setUploadStatus(true);
        fetch(getGlobalState().server + "/api/video/upload", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                setUploadStatus(false)
                if (response.status === 200) {
                    ToastAndroid.showWithGravity("上传视频成功", 1000, 1);
                } else {
                    ToastAndroid.showWithGravity("上传视频失败", 1000, 1);
                }
            })
            .catch(error => {
                console.error('error', error);
            });
    }

    const handleSelectVideoButton = async () => {
        const pickerResult = await DocumentPicker.pickSingle({
            presentationStyle: 'fullScreen',
            type: "video/mp4"
        })
        setUploadInfo({...uploadInfo, videoUrl: pickerResult.uri})
    }

    const handleSelectCoverButton = async () => {
        const pickerResult = await DocumentPicker.pickSingle({
            presentationStyle: 'fullScreen',
            type: "image/png"
        })
        setUploadInfo({...uploadInfo, coverUrl: pickerResult.uri})
    }

    return (
        <KeyboardAvoidingView style={{height: "100%"}} behavior={'padding'}>
            <ScrollView style={{height: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                <View style={{alignItems: "center", marginTop: 60}}>
                    <Text variant={"displayMedium"}>
                        上传视频
                    </Text>
                </View>
                <View
                    style={{width: "100%", alignItems: "center", marginTop: 60}}>
                    <TextInput label="title"
                               value={uploadInfo.title}
                               onChangeText={text => setUploadInfo({
                                   ...uploadInfo,
                                   title: text
                               })}
                               mode={'outlined'}
                               style={{"width": "60%", margin: 5}}>

                    </TextInput>
                    <TextInput label="detail"
                               value={uploadInfo.detail}
                               onChangeText={text => setUploadInfo({
                                   ...uploadInfo,
                                   detail: text
                               })}
                               mode={'outlined'}
                               multiline={true}
                               scrollEnabled={true}
                               style={{"width": "60%", margin: 5}}>

                    </TextInput>

                    {uploadInfo.videoUrl === "" ?
                        <></> :
                        <Video source={{uri: uploadInfo.videoUrl}} controls={true}
                               onLoad={(e) => setUploadInfo({...uploadInfo, length: e.duration})}
                               style={{width: '80%', height: 200}}/>
                    }
                    <Button onPress={handleSelectVideoButton}
                            mode={'contained'}
                            style={{width: "60%", margin: 30}}>
                        选择视频
                    </Button>
                    {uploadInfo.coverUrl === "" ?
                        <></> :
                        <Image source={{uri: uploadInfo.coverUrl}} style={{width: '80%', height: 200}}/>}


                    <Button onPress={handleSelectCoverButton}
                            mode={'contained'}
                            style={{width: "60%", margin: 30}}>
                        选择封面
                    </Button>
                    {
                        uploadStatus
                            ? <Button
                                mode={'contained'}
                                disabled={true}
                                style={{width: "60%", margin: 30}}>
                                正在上传...
                            </Button>
                            : <Button onPress={handleUploadButton}
                                      mode={'contained'}
                                      disabled={uploadInfo.videoUrl === "" || uploadInfo.coverUrl === "" || uploadInfo.title === ""}
                                      style={{width: "60%", margin: 30}}>
                                上传视频
                            </Button>
                    }

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


export default UploadPage;
