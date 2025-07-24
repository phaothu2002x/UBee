import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [form, setForm] = useState({ email: '', password: '' });

    const onSignInPress = async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px] ">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl font-JakartaSemiBold absolute bottom-5 left-5 text-black">
                        Welcome 👋👋👋
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Email"
                        icon={icons.email}
                        placeholder="Enter your Email"
                        value={form.email}
                        onChangeText={(value) => {
                            setForm({ ...form, email: value });
                        }}
                    />
                    <InputField
                        label="password"
                        icon={icons.lock}
                        placeholder="Enter your Password"
                        value={form.password}
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            setForm({ ...form, password: value });
                        }}
                    />

                    <CustomButton
                        title="Sign In"
                        className="mt-6"
                        onPress={onSignInPress}
                    />
                    {/* oAuth */}
                    <OAuth />

                    <Link
                        href="/sign-up"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text>Don't have an account? </Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
                {/* vertification model */}
            </View>
        </ScrollView>
    );
};

export default SignIn;
