import FreezingRain from './freezing-rain.svg';
import IcePellets from './ice-pellete.svg';
import Snow from './snow.svg';
import Thunderstorm from './thunderstorm.svg';
import RainHeavy from './rain-heavy.svg';
import Rain from './rain-moderate.svg';
import Fog from './fog.svg';
import Cloudy from './cloudy.svg';
import PartlyCloudy from './partly-cloudy.svg';
import Clear from './clear-day.svg';

const getIcon = (weatherCode) => {
    const id = Number(weatherCode);
    switch (id) {
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            return { text: "Freezing Rain", icon: FreezingRain };
        case 622:
            return { text: "Ice Pellets", icon: IcePellets };
        case (id >= 600 && id <= 621):
            return { text: "Snow", icon: Snow };
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            return { text: "Thunderstorm", icon: Thunderstorm };
        case 501:
        case 500:
        case (id >= 300 && id <= 321):
            return { text: "Light Rain", icon: Rain };
        case 502:
        case 503:
        case 504:
            return { text: "Heavy Rain", icon: RainHeavy };
        case (id >= 701 && id <= 781):
            return { text: "Fog", icon: Fog };
        case 801:
        case 802:
            return { text: "Cloudy", icon: Cloudy };
        case 803:
        case 804:
            return { text: "Partly Cloudy", icon: PartlyCloudy };
        case 800:
            return { text: "Clear Day", icon: Clear };;
        default:
            return 500;
    }
}

export default getIcon;
