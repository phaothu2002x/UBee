import React from 'react';
import { Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
const Map = () => {
    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            className="w-full h-full rounded-2xl"
            tintColor="black"
            mapType="mutedStandard"
        >
            <Text>Map</Text>
        </MapView>
    );
};

export default Map;
