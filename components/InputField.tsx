import { InputFieldProps } from '@/types/type';
import React from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const InputField = ({
    label,
    labelStyle,
    containerStyle,
    icon,
    iconStyle,
    inputStyle,
    secureTextEntry = false,
    className,
    ...props
}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full ">
                    <Text
                        border-t-emerald-600
                        className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle} `}
                    >
                        {label}
                    </Text>
                    <View
                        className={` flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
                    >
                        {icon && (
                            <Image
                                source={icon}
                                className={`w-6 h-6 ml-4 ${iconStyle}`}
                            />
                        )}
                        <TextInput
                            className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle} `}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;
