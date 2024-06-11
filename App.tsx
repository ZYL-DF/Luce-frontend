import React, {useEffect, useState} from 'react';
import LoginPage from "./src/pages/LoginPage.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import VideoListPage from "./src/pages/VideoListPage.tsx";
import ProfilePage from "./src/pages/ProfilePage.tsx";
import {SafeAreaProvider} from "react-native-safe-area-view";
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPage from "./src/pages/VideoPage.tsx";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import storage from "./src/utils/storage.ts";
import RegisterPage from "./src/pages/RegisterPage.tsx";
import UploadPage from "./src/pages/UploadPage.tsx";


function App(): React.JSX.Element {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    useEffect(() => {
        storage.load({
            key: 'loginState'
        }).then(ret => {
            if (ret.token === null) {
                setIsSignedIn(false)
            } else {
                setIsSignedIn(true)
            }
            return ret.token;
        })
    }, []);

    function HomeScreen() {
        return (
            <VideoStack.Navigator screenOptions={{headerShown: false}}>
                <VideoStack.Screen name="VideoList" component={VideoListScreen}
                                   options={{animation: 'slide_from_left', orientation: 'portrait'}}/>
                <VideoStack.Screen name="Video" component={VideoScreen} options={{animation: 'slide_from_right'}}/>
            </VideoStack.Navigator>

        );
    }

    // @ts-ignore
    function VideoListScreen({navigation}) {
        return (
            <VideoListPage navigation={navigation}/>
        )
    }

    function ProfileScreen() {
        return (
            <VideoStack.Navigator screenOptions={{headerShown: false}}>
                <VideoStack.Screen name="UserInfo" component={UserInfoScreen}
                                   options={{animation: 'slide_from_left', orientation: 'portrait'}}/>
                <VideoStack.Screen name="Upload" component={UploadScreen} options={{animation: 'slide_from_right'}}/>
            </VideoStack.Navigator>

        );
    }

    // @ts-ignore
    function UserInfoScreen({navigation}) {
        return (
            <ProfilePage setIsSignedIn={setIsSignedIn} navigation={navigation}/>
        );
    }

    // @ts-ignore
    function UploadScreen({navigation}) {
        return (
            <UploadPage navigation={navigation}/>
        );
    }

    // @ts-ignore
    function LoginScreen({navigation}) {
        return (
            <LoginPage setIsSignedIn={setIsSignedIn} navigation={navigation}/>
        )
    }

    // @ts-ignore
    function RegisterScreen({navigation}) {
        return (
            <RegisterPage navigation={navigation}/>
        )
    }

    // @ts-ignore
    function VideoScreen({route}) {
        const {videoInfo} = route.params;
        console.log(videoInfo)
        const props = videoInfo
        return (
            <VideoPage id={props.id}
                       url={props.url}
                       coverUrl={props.coverUrl}
                       detail={props.detail}
                       length={props.length}
                       title={props.title}
                       uploadDate={props.uploadDate}
                       uploadUserId={props.uploadUserId}
                       playTimes={props.playTimes}
            />
        )
    }


    const AuthStack = createNativeStackNavigator();
    const VideoStack = createNativeStackNavigator();
    const ProfileStack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const BottomTabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        return (<>
                            {route.name === 'Home' ? (
                                <Icon name={'home'} color={color} size={size}/>
                            ) : (
                                <Icon name={'person'} color={color} size={size}/>
                            )
                            }
                        </>)
                    },
                    tabBarActiveTintColor: '#8699f8',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    swipeEnabled: true,
                })}>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>
        )
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AuthStack.Navigator screenOptions={{headerShown: false}}>
                    {
                        isSignedIn
                            ? <AuthStack.Screen name="BottomNavigation" component={BottomTabNavigator}
                                                options={{animation: 'fade'}}/>
                            : (<>
                                    <AuthStack.Screen name="LoginScreen" component={LoginScreen}
                                                      options={{animation: 'fade'}}/>
                                    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen}
                                                      options={{animation: 'fade'}}/>
                                </>
                            )
                    }
                </AuthStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App;
