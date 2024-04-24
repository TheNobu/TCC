// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
// import axios from 'axios';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const Map = () => {
//     const style = StyleSheet.create({
//         map: {
//             flex: 1,
//             width: '100%'
//         },
//         searchBarContainer: {
//             position: 'absolute',
//             top: 60,
//             width: '100%',
//             paddingHorizontal: 10,
//             zIndex: 1,
//         },
//         buttonContainer: {
//             position: 'absolute',
//             bottom: 20,
//             alignSelf: 'center',
//             paddingHorizontal: 10,
//             paddingVertical: 5,
//             borderRadius: 8,
//             backgroundColor: '#B5C7F5',
//         },
//         buttonText: {
//             fontSize: 16,
//         },
//     });

//     const [location, setLocation] = useState(null);
//     const [routeCoordinates, setRouteCoordinates] = useState([]);
//     const [userMarker, setUserMarker] = useState(null);

//     async function requestLocationPermissions() {
//         const { granted } = await requestForegroundPermissionsAsync();

//         if (granted) {
//             const { coords } = await getCurrentPositionAsync();
//             setLocation(coords);
//             setRouteCoordinates(prevCoords => [...prevCoords, coords]);
//         }
//     }

//     // useEffect(() => {
//     //     requestLocationPermissions();
//     //     const subscription = watchPositionAsync({
//     //         accuracy: LocationAccuracy.Highest,
//     //         timeInterval: 1000,
//     //         distanceInterval: 1
//     //     }, (response) => {
//     //         setLocation(response.coords);
//     //     });
//     //     return () => subscription.remove();
//     // }, []);
//     useEffect(() => {
//         let subscription;
    
//         const startWatchingPosition = async () => {
//             const positionSubscription = await watchPositionAsync({
//                 accuracy: LocationAccuracy.Highest,
//                 timeInterval: 1000,
//                 distanceInterval: 1
//             }, (response) => {
//                 setLocation(response.coords);
//             });
//             subscription = positionSubscription;
//         };
    
//         const stopWatchingPosition = () => {
//             if (subscription) {
//                 subscription.remove();
//             }
//         };
    
//         requestLocationPermissions();
//         startWatchingPosition();
    
//         return stopWatchingPosition;
//     }, []);

//     const handleMapPress = async ({ nativeEvent }) => {
//         const { coordinate } = nativeEvent;
//         setUserMarker(coordinate);
//         await calculateRoute(location, coordinate);
//     };

//     const markerRemove = () => {
//         setUserMarker(null)
//         setRouteCoordinates([])
//     }

//     const calculateRoute = async (origin, destination) => {
//         const apiKey = 'AIzaSyD7jQHGmepNfVzBHJ01xqEdzLeGESdy19Y';
//         const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;

//         try {
//             const response = await axios.get(apiUrl);
//             const route = response.data.routes[0].overview_polyline.points;
//             const decodedRoute = decodePolyline(route);
//             setRouteCoordinates(decodedRoute);
//         } catch (error) {
//             console.error('Error fetching route:', error);
//         }
//     };

//     const decodePolyline = (encoded) => {
//         let index = 0,
//             len = encoded.length,
//             lat = 0,
//             lng = 0,
//             coordinates = [];

//         while (index < len) {
//             let b, shift = 0,
//                 result = 0;

//             do {
//                 b = encoded.charCodeAt(index++) - 63;
//                 result |= (b & 0x1f) << shift;
//                 shift += 5;
//             } while (b >= 0x20);

//             let dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
//             lat += dlat;

//             shift = 0;
//             result = 0;

//             do {
//                 b = encoded.charCodeAt(index++) - 63;
//                 result |= (b & 0x1f) << shift;
//                 shift += 5;
//             } while (b >= 0x20);

//             let dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
//             lng += dlng;

//             coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
//         }

//         return coordinates;
//     };

//     const initialRegion = location ? {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005
//     } : null;

//     return (
//         <View style={{ flex: 1 }}>
//             <View style={style.searchBarContainer}>
//             <GooglePlacesAutocomplete
//                     placeholder='Search'
//                     onPress={(data, details = null) => {
//                         console.log(data, details);
//                     }}
//                     query={{
//                         key: 'AIzaSyD7jQHGmepNfVzBHJ01xqEdzLeGESdy19Y',
//                         language: 'en', 
//                         components: 'country:br',
//                     }}
//                 />
//             </View>
//             {initialRegion && (
//                 <MapView
//                     style={style.map}
//                     initialRegion={initialRegion}
//                     showsUserLocation={true}
//                     followsUserLocation={true}
//                     onPress={handleMapPress}
//                 >
//                     {userMarker && (
//                         <Marker
//                             coordinate={userMarker}
//                             title="Your destination"
//                             pinColor="green"
//                         />
//                     )}
//                     {/* <Marker
//                         coordinate={initialRegion}
//                         title="Your location"
//                         description="You are here"
//                         pinColor="blue"
//                     /> */}
//                     <Polyline
//                         coordinates={routeCoordinates}
//                         strokeWidth={6}
//                         strokeColor='#2962F4'
//                     />
//                 </MapView>
//             )}
//             <TouchableOpacity style= {style.buttonContainer}onPress={markerRemove}>
//                 <Text style={style.buttonText}>Remover Marcador</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default Map;



import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Map = () => {
    const style = StyleSheet.create({
        map: {
            flex: 1,
            width: '100%'
        },
        searchBarContainer: {
            position: 'absolute',
            top: 60,
            width: '100%',
            paddingHorizontal: 10,
            zIndex: 1,
        },
        buttonContainer: {
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: '#B5C7F5',
            marginLeft:260,
        },
        buttonContainer2: {
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: '#B5C7F5',
            marginLeft:12
        },
        buttonText: {
            fontSize: 16,
        },
    });

    const [location, setLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [userMarker, setUserMarker] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const { coords } = await getCurrentPositionAsync();
            setLocation(coords);
            setRouteCoordinates(prevCoords => [...prevCoords, coords]);
        }
    }

    // useEffect(() => {
    //     requestLocationPermissions();
    //     const subscription = watchPositionAsync({
    //         accuracy: LocationAccuracy.Highest,
    //         timeInterval: 1000,
    //         distanceInterval: 1
    //     }, (response) => {
    //         setLocation(response.coords);
    //     });
    //     return () => subscription.remove();
    // }, []);


    useEffect(() => {
        let subscription;
    
        const startWatchingPosition = async () => {
            const positionSubscription = await watchPositionAsync({
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1
            }, (response) => {
                setLocation(response.coords);
            });
            subscription = positionSubscription;
        };
    
        const stopWatchingPosition = () => {
            if (subscription) {
                subscription.remove();
            }
        };
    
        requestLocationPermissions();
        startWatchingPosition();
    
        return stopWatchingPosition;
    }, []);

    const handleMapPress = async ({ nativeEvent }) => {
        const { coordinate } = nativeEvent;
        setUserMarker(coordinate);
        await calculateRoute(location, coordinate);
    };

    const markerRemove = () => {
        setUserMarker(null)
        setRouteCoordinates([])
    }

    const makerSearchRemove = () =>{
        setMapRegion(null)
    }

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
            <View style={style.searchBarContainer}>
            <GooglePlacesAutocomplete
                    placeholder='Pesquisar'
                    onPress={(data, details = null) => {
                        // console.log(details)
                        // if (details) {
                        //     const { lat, lng } = details.geometry.location;
                        //     console.log('Latitude:', lat);
                        //     console.log('Longitude:', lng);
                        // } else {
                        //     console.error('Detalhes do local não estão disponíveis.');
                        // }
                        const placeId = details.place_id; // Obtido do objeto 'details'

// Faça uma solicitação à API do Google Places para obter os detalhes completos do local
                    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyD7jQHGmepNfVzBHJ01xqEdzLeGESdy19Y`)
                        .then(response => response.json())
                        .then(data => {
                            // Extraia as coordenadas de latitude e longitude dos detalhes do local
                            const { lat, lng } = data.result.geometry.location;
                            console.log('Latitude:', lat);
                            console.log('Longitude:', lng); 
                            const region = {
                                latitude: lat,
                                longitude: lng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            };
                            setMapRegion(region)
                        })
                        .catch(error => console.error('Erro ao obter detalhes do local:', error));
                    }}
                    query={{
                        key: 'AIzaSyD7jQHGmepNfVzBHJ01xqEdzLeGESdy19Y',
                        language: 'pt', 
                        components: 'country:br',
                    }}
                />
            </View>
            <View>
            </View>
            {initialRegion && (
                <MapView
                style={style.map}
                initialRegion={initialRegion} // Use mapRegion como a região inicial do mapa
                region={mapRegion} // Defina a região atual do mapa para o local pesquisado
                showsUserLocation={true}
                followsUserLocation={true}
                onPress={handleMapPress}
                >
                    {userMarker && (
                        <Marker
                            coordinate={userMarker}
                            title="Your destination"
                            pinColor="red"
                        />
                    )}
                    {mapRegion && (
                    <Marker
                    coordinate={mapRegion}
                    title="Local pesquisado"
                    pinColor="blue"
                    />
                    )}
                    {/* <Marker
                        coordinate={initialRegion}
                        title="Your location"
                        description="You are here"
                        pinColor="blue"
                    /> */}
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={6}
                        strokeColor='#2962F4'
                    />
                </MapView>
            )}
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style= {style.buttonContainer}onPress={markerRemove}>
                <Text style={style.buttonText}>Remover Destino</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {style.buttonContainer2}onPress={makerSearchRemove}>
                <Text style={style.buttonText}>Remover Pesquisa</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default Map;

