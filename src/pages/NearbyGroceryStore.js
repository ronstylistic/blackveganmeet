import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import CustomHeader from '../components/CustomHeader';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = null;
const LONGITUDE = null;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const API_KEY = "AIzaSyC1-1LEDMlP5S3xr9sHzQqmuzdtIcv0NkE";

const geoOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class NearbyGroceryStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageToken: '',
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markers: []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomHeader navigation={navigation} headerTitle='Nearby Grocery Store' />
        )
    });

    componentDidMount() {
        this.getData();   
    }

    getData = () => {
        
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const { pageToken } = this.state;

                const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=supermarket&key=${API_KEY}`

                let url = pageToken === '' ? urlFirst : urlFirst + `&pagetoken=${pageToken}`;

                fetch(url)
                    .then(res => {
                        return res.json()
                    })
                    .then(res => {

                        this.setState({
                            markers: res.results,
                            loading: false,
                            pageToken: res.next_page_token,
                            region: {
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA
                            }
                        });

                    })
                    .catch(error => {
                        alert(error);
                        this.setState({ loading: false });
                    })

                },
                (error) => {
                });
    }

    _renderItem = ({ item }) => {
        return (
            <ListItem button onPress={() => alert(item.id)}>
                <Thumbnail size={80} square source={{ uri: item.icon }} />
                <Text> {item.name} </Text>
            </ListItem>
        )
    }

    render() {
        if (this.state.loading) return <Loader />
        
        return (
            <Container>
                <View style={styles.container}>
                        <MapView
                            style={styles.map}
                            region={this.state.region}>

                            {this.state.markers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
                                    title={marker.name}
                                    description={marker.name} />
                            ))}

                        </MapView>
                </View>
                
                <View style={styles.listContainer}>
                    <List>
                        <FlatList
                            data={this.state.markers}
                            keyExtractor={item => item.id}
                            renderItem={this._renderItem}
                        />
                    </List>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 400
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    listContainer:{
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
});