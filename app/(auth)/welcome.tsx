import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
    return (
        <SafeAreaView className="flex justify-center items-center w-full h-full">
            <Text className="text-2xl text-teal-400 font-bold">
                Welcome be happy while coding!😘😘
            </Text>
        </SafeAreaView>
    );
};

export default Onboarding;
