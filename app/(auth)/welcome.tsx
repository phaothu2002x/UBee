import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    //make logic for button "NEXT"
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className="flex justify-between items-center h-full bg-white">
            <TouchableOpacity
                onPress={() => {
                    router.replace('/(auth)/sign-up');
                }}
                className="w-full flex items-end justify-end p-5"
            >
                <Text className="text-black text-md font-JakartaBold">
                    Skip
                </Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={
                    <View className="w-[32px] h-[8px] mx-1 bg-[#e2e8f0] rounded-full" />
                }
                activeDot={
                    <View className="w-[32px] h-[8px] mx-1 bg-[#0286ff] rounded-full" />
                }
                onIndexChanged={(index) => {
                    setActiveIndex(index);
                }}
            >
                {onboarding.map((item) => (
                    <View
                        key={item.id}
                        className="flex items-center justify-center"
                    >
                        <Image
                            source={item.image}
                            className="w-full h-[300px] "
                            resizeMode="contain"
                        />
                        <View className="flex flex-row w-full  items-center justify-center mt-10 w-full">
                            <Text className="text-3xl text-black font-bold text-center mx-10">
                                {item.title}
                            </Text>
                        </View>
                        <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                            {item.description}
                        </Text>
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? 'Get Started' : 'Next'}
                onPress={() =>
                    isLastSlide
                        ? router.replace('/(auth)/sign-up')
                        : swiperRef.current?.scrollBy(1)
                }
                className="w-10/12 mt-10"
            />
        </SafeAreaView>
    );
};

export default Onboarding;
