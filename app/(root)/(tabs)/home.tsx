import { useUser } from '@clerk/clerk-expo';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
    const { user } = useUser();

    return (
        <SafeAreaView className="bg-general-500">
            <FlatList />
        </SafeAreaView>
    );
}
