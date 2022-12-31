/* eslint-disable global-require */

function weatherData (img, weather) {
  return {
    img: img,
    weather: weather
  }
}

export const getImageForWeather = (weathercode) => {

  const images = {
    Clear: require('../assets/clear.png'), // done
    Hail: require('../assets/hail.png'), // done
    'Heavy Cloud': require('../assets/heavy-cloud.png'), // done 
    'Light Cloud': require('../assets/light-cloud.png'), // done
    'Heavy Rain': require('../assets/heavy-rain.png'), // done
    'Light Rain': require('../assets/light-rain.png'), // done
    Showers: require('../assets/showers.png'), // done
    Sleet: require('../assets/sleet.png'), // done
    Snow: require('../assets/snow.png'), // done
    Thunder: require('../assets/thunder.png'),
  };

  console.log(weathercode)

  switch (true) {
    case weathercode >= 0 && weathercode < 2:
      return weatherData(images.Clear, 'Clear');
    case weathercode === 2:
      return weatherData(images['Light Cloud'], 'Light Cloud');
    case weathercode === 3:
      return weatherData(images['Heavy Cloud'], 'Heavy Cloud');
    case weathercode >= 51 && weathercode < 53:
      return weatherData(images['Light Rain'], 'Light Rain');
    case weathercode === 53 || weathercode === 55:
      return images.Showers;
    case weathercode >= 61 && weathercode <= 65:
      return images['Heavy Rain'];
    case weathercode === 67:
      return images.Hail;
    case weathercode === 66:
      return images.Sleet;
    case weathercode >= 71 && weathercode <= 77:
      return images.Snow;
    case weathercode >= 85 && weathercode <= 86:
      return images.Snow;
    case weathercode >= 96 && weathercode < 100:
      return images.Thunder;
    default:
      break;
  }
  return {
    img: 'NA',
    weather: 'NA'
  };
}
