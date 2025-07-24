import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignUp = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const onSignUpPress = async () => {};

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
            </View>
        </ScrollView>
    );
};

export default SignUp;
