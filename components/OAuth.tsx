import { icons } from '@/constants';
import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const OAuth = () => {
    const handleGoogleSignIn = async () => {};
    return (
        <View>
            <View className="flex flex-row justify-center items-center gap-x-3 mt-4">
                <View className="flex-1 h-1 bg-general-100" />
                <Text className="text-lg ">Or</Text>
                <View className="flex-1 h-1 bg-general-100" />
            </View>

            <CustomButton
                title="Log in with google"
                className="w-full mt-5 shadow-none"
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />
        </View>
    );
};

export default OAuth;
