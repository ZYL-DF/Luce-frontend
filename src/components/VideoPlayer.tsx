// Load the module

import Video, {OnVideoErrorData, VideoRef} from 'react-native-video';
import {useRef} from "react";
import {StyleSheet} from 'react-native';
import {getGlobalState} from "../GlobalState.ts";


export const VideoPlayer = ({videoUrl}: { videoUrl: string }) => {
    const videoRef = useRef<VideoRef>(null);

    function onError(err: OnVideoErrorData) {
        console.log(err);
    }
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
        />
    )
}

// Later on in your styles
var styles = StyleSheet.create({
    backgroundVideo: {
        width : '100%',
        height : '30%',
    },
});
