import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabIcon = ({
    focused,
    source,
}: {
    source: ImageSourcePropType;
    focused: boolean;
}) => {
    return (
        <View
            className={`flex flex-row justify-center items-center rounded-full ${
                focused ? 'bg-general-300' : ''
            }`}
        >
            <View
                className={`w-12 h-12  items-center justify-center rounded-full ${
                    focused ? 'bg-general-400' : ''
                }`}
            >
                <Image
                    source={source}
                    className="w-7 h-7"
                    resizeMode="contain"
                    tintColor="white"
                />
            </View>
        </View>
    );
};

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#333333',
                    borderRadius: 50,
                    overflow: 'hidden',
                    paddingBottom: 0,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 78,
                    position: 'absolute',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.home} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: 'Rides',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.list} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.chat} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.profile} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
