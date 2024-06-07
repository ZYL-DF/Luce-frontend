import React from 'react';
import LoginPage from "./src/pages/LoginPage.tsx";
import {createStaticNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./src/pages/HomePage.tsx";
import ProfilePage from "./src/pages/ProfilePage.tsx";
import {SafeAreaProvider} from "react-native-safe-area-view";
import Icon from 'react-native-vector-icons/MaterialIcons';


function App(): React.JSX.Element {

    function HomeScreen() {
        return (
            <HomePage/>
        );
    }

    function ProfileScreen() {
        return (
            <ProfilePage/>
        );
    }

    function

    const RootTabs =
        createBottomTabNavigator({
            screenOptions: ({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    return (<>
                        {route.name === 'Home' ? (
                            <Icon name={'home'} color={color} size={size}/>
                        ) : (
                            <Icon name={'person'} color={color} size={size}/>
                        )
                        }
                    </>)
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            }),
            screens: {
                "Home": HomeScreen,
                "Profile": ProfileScreen,
            },
        });


    const Navigation = createStaticNavigation(RootTabs);
    return (
        <SafeAreaProvider>
            <Navigation></Navigation>
        </SafeAreaProvider>
    )
}

export default App;
