// Load the module

import Video, {OnVideoErrorData, VideoRef} from 'react-native-video';
import React, {useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, useWindowDimensions} from 'react-native';
import {getGlobalState} from "../GlobalState.ts";
import Orientation from "react-native-orientation-locker";


export const VideoPlayer = ({videoUrl, setVideoHeight}: {
    videoUrl: string,
    setVideoHeight: React.Dispatch<React.SetStateAction<number>>
}) => {
    const videoRef = useRef<VideoRef>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const window = useWindowDimensions();

    function onError(err: OnVideoErrorData) {
        console.log(err);
    }

    useEffect(() => {
        Orientation.addDeviceOrientationListener((orientation) => {
            console.log(orientation);

            Orientation.getAutoRotateState(state => {
                console.log(state);
                if (state) {
                    if (videoRef.current) {
                        if (orientation === 'PORTRAIT') {
                                videoRef.current.dismissFullscreenPlayer()
                        } else if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
                                videoRef.current.presentFullscreenPlayer()
                        }
                    }
                }
            })
        })

        return ()=>{
            Orientation.removeDeviceOrientationListener((orientation) => {})
        }
    }, []);
    return (
        <Video
            // Can be a URL or a local file.
            source={{uri: getGlobalState().server + '/play/' + videoUrl}}
            // Store reference
            ref={videoRef}
            // Callback when remote video is buffering
            // onBuffer={onBuffer}
            // // Callback when video cannot be loaded
            onError={error => onError(error)}
            style={styles.backgroundVideo}
            resizeMode="contain"
            paused={false}
            controls={true}

            onFullscreenPlayerWillPresent={()=>{
                Orientation.lockToLandscape()
            }}
            onFullscreenPlayerWillDismiss={()=>{
                Orientation.lockToPortrait()
            }}
        />
    )
}

// Later on in your styles
const styles = StyleSheet.create({
    backgroundVideo: {
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
    },
});
