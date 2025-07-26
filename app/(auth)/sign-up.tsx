import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import Modal from 'react-native-modal';

const SignUp = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { isLoaded, signUp, setActive } = useSignUp();

    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: '',
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setVerification({ ...verification, state: 'pending' });
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            Alert.alert('Error', err.errors[0].longMessage);
            // console.error(JSON.stringify(err, null, 2));
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                //create database user

                await fetchAPI('/(api)/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: signUpAttempt.createdUserId,
                    }),
                });

                await setActive({ session: signUpAttempt.createdSessionId });
                setVerification({ ...verification, state: 'success' });
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                setVerification({
                    ...verification,
                    state: 'failed',
                    error: 'verification failed',
                });
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({
                ...verification,
                state: 'failed',
                error: err.error[0].longMessage,
            });
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
                        Create your account
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="name"
                        icon={icons.person}
                        placeholder="Enter your name"
                        value={form.name}
                        onChangeText={(value) => {
                            setForm({ ...form, name: value });
                        }}
                    />
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
                        title="Sign up"
                        className="mt-6"
                        onPress={onSignUpPress}
                    />
                    {/* oAuth */}
                    <OAuth />
                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text>Already have account? </Text>
                        <Text className="text-primary-500">Log in</Text>
                    </Link>
                </View>
                {/* vertification model */}
                <Modal isVisible={verification.state === 'success'}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl text-center font-JakartaBold">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            You have successfully verified your account!
                        </Text>
                        <CustomButton
                            title="Browse home"
                            onPress={() => router.push('/(root)/(tabs)/home')}
                            className="mt-5"
                        />
                    </View>
                </Modal>
                {/* pending verification modal */}
                <Modal
                    isVisible={verification.state === 'pending'}
                    onModalHide={() =>
                        setVerification({ ...verification, state: 'success' })
                    }
                >
                    <View className="bg-white rounded-2xl px-7 py-9 min-h-[300px]">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">
                            Verification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            We've send a verification to {form.email}
                        </Text>
                        <InputField
                            label="code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {/* having error ? */}
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <CustomButton
                            title="Verify email"
                            onPress={onVerifyPress}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default SignUp;
