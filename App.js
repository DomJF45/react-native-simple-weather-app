import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ImageBackground, ActivityIndicator } from 'react-native';
import SearchInput from './components/SearchInput';
import {getImageForWeather} from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';


export default App = () => {

  const [userLocation, setUserLocation] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userTemperature, setUserTemperature] = useState(0);
  const [userWeather, setUserWeather] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(require('./assets/clear.png'));

  const initialState = {
    location: '',
    error: false,
    loading: false,
    temperature: 0,
    weather: ''
  }
  
  const [state, setState] = useState(initialState);


  const handleUpdateLocation = async (city) => {
    if (!city) return;

    setLoading(false);

    try {
      const { latitude, longitude } = await fetchLocationId(city);
      const { current_weather: { temperature, weathercode } } = await fetchWeather(latitude, longitude);
      const { img, weather } = getImageForWeather(weathercode);
      setLoading(false);
      setUserLocation(city);
      setUserTemperature(Math.round((temperature * 9/5) + 32));
      setUserWeather(weather);
      setBackgroundImage(img);
      setError(false);
    } catch(e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  }

  useEffect(() => {
    console.log('Component has Mounted!')  
  }, [])

  return(
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground
        style={styles.imageContainer}
        source={backgroundImage}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>

          <ActivityIndicator animating={loading} color="white" size="large" />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{userLocation}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{userWeather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{`${userTemperature}°`}</Text>
                </View>
              )}
            </View>
          )}
          

          <SearchInput placeholder={"Search any city"} onSubmit={handleUpdateLocation} />
        </View>
      </ImageBackground>


    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textStyle:{
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  }
  
});
