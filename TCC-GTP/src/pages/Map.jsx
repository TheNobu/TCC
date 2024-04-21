import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';


const Map = () => {
    const style = StyleSheet.create({
        map: {
            flex: 1,
            width: '100%'
        },
        buttonContainer: {
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: 'white',
        },
        buttonText: {
            fontSize: 16,
        },
    });

    const [location, setLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [userMarker, setUserMarker] = useState(null);



    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const { coords } = await getCurrentPositionAsync();
            setLocation(coords);
            setRouteCoordinates(prevCoords => [...prevCoords, coords]);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
        const subscription = watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response.coords);
        });
        return () => subscription.remove();
    }, []);

    const handleMapPress = async ({ nativeEvent }) => {
        const { coordinate } = nativeEvent;
        setUserMarker(coordinate);
        await calculateRoute(location, coordinate);
    };

    const calculateRoute = async (origin, destination) => {
        const apiKey = 'AIzaSyD7jQHGmepNfVzBHJ01xqEdzLeGESdy19Y';
        const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const route = response.data.routes[0].overview_polyline.points;
            const decodedRoute = decodePolyline(route);
            setRouteCoordinates(decodedRoute);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const decodePolyline = (encoded) => {
        let index = 0,
            len = encoded.length,
            lat = 0,
            lng = 0,
            coordinates = [];

        while (index < len) {
            let b, shift = 0,
                result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            let dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            let dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }

        return coordinates;
    };

    const initialRegion = location ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    } : null;

    return (
        <View style={{ flex: 1 }}>
            {initialRegion && (
                <MapView
                    style={style.map}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onPress={handleMapPress}
                >
                    {userMarker && (
                        <Marker
                            coordinate={userMarker}
                            title="Seu destino"
                            pinColor="green"
                        />
                    )}
                    {/* <Marker
                        coordinate={initialRegion}
                        title="Sua localização"
                        description="Você está aqui"
                        pinColor="blue"
                    /> */}
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={2}
                        strokeColor='#2962F4'
                    />
                </MapView>
            )}
        </View>
    );
};

export default Map;

