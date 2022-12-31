import axios from 'axios';

export const fetchLocationId = async city => {
  
  const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
    headers: {
      'X-Api-Key': '7tunb6sAnR72Xt04pEyHHQ==GlAG7p5nqkNT6Tkg'
    }
  }).then((res) => res.data);
  console.log('geoCode', response[0]);
  
  return response[0];

};

export const fetchWeather = async (latitude, longitude) => {
  
  const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  .then((res) => res.data);
  console.log('Weather: ', response)
  return response;

};