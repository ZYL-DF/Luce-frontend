import createClient from "openapi-fetch";
import {Dimensions, useWindowDimensions, View} from "react-native";
import * as openapi from '../Interfaces/openapi'
import {VideoPlayer} from "../components/VideoPlayer.tsx";
import {VideoINTF} from "../interfaces/VideoINTF.ts";
import {SegmentedButtons, ToggleButton} from "react-native-paper";
import {useEffect, useState} from "react";
import {VideoInfo} from "../components/VideoInfo.tsx";
import {VideoCommentShower} from "../components/VideoCommentShower.tsx";

const client = createClient<openapi.paths>()

export function VideoPage(props: VideoINTF) {
    const {
        id,
        url,
        coverUrl,
        title,
        detail,
        playTimes,
        uploadDate,
        uploadUserId,
        length
    } = props;

    const [segmentPart, setSegmentPart] = useState<string>("Info");
    const [videoHeight, setVideoHeight] = useState<number>(0);

    useEffect(() => {
        setVideoHeight(Dimensions.get('window').width * (9 / 16),)
    }, [videoHeight]);



    return (
        <View style={{width: "100%", height: "100%"}}>
            <View style={{height: videoHeight}}>
                <VideoPlayer videoUrl={url} setVideoHeight={setVideoHeight}/>
            </View>
            <View style={{height: 'auto'}}>
                <SegmentedButtons
                    value={segmentPart}
                    onValueChange={setSegmentPart}
                    style={{marginTop: 5}}
                    buttons={[
                        {
                            value: 'Info',
                            label: '简介',
                        },
                        {
                            value: 'Comments',
                            label: '评论',
                        },
                    ]}/>
            </View>
            <View style={{flex: 1, marginTop: 5}}>
                {
                    segmentPart === 'Info' ?
                        <VideoInfo id={id}
                                   url={url}
                                   coverUrl={coverUrl}
                                   title={title}
                                   detail={detail}
                                   playTimes={playTimes}
                                   uploadDate={uploadDate}
                                   uploadUserId={uploadUserId}
                                   length={length}/>
                        : <VideoCommentShower></VideoCommentShower>

                }
            </View>
        </View>
    )
}


export default VideoPage;
