import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
    const { isSignedIn } = useAuth();
    console.log('check isSingin', isSignedIn);

    if (isSignedIn) {
        return <Redirect href={'/(root)/(tabs)/home'} />;
    }
    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
