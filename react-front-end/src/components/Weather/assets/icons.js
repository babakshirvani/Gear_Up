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

    const img = {
        '01d': 'http://openweathermap.org/img/wn/01d@2x.png',
        '01n': 'http://openweathermap.org/img/wn/01n@2x.png',
        '02d': 'http://openweathermap.org/img/wn/02d@2x.png',
        '02n': 'http://openweathermap.org/img/wn/02n@2x.png',
        '03d': 'http://openweathermap.org/img/wn/03d@2x.png',
        '03n': 'http://openweathermap.org/img/wn/03n@2x.png',
        '04n': 'http://openweathermap.org/img/wn/04n@2x.png',
        '04d': 'http://openweathermap.org/img/wn/04d@2x.png',
        '09d': 'http://openweathermap.org/img/wn/09d@2x.png',
        '09n': 'http://openweathermap.org/img/wn/09n@2x.png',
        '10d': 'http://openweathermap.org/img/wn/10d@2x.png',
        '10n': 'http://openweathermap.org/img/wn/10n@2x.png',
        '11d': 'http://openweathermap.org/img/wn/11d@2x.png',
        '11n': 'http://openweathermap.org/img/wn/11n@2x.png',
        '13d': 'http://openweathermap.org/img/wn/13d@2x.png',
        '13n': 'http://openweathermap.org/img/wn/13n@2x.png',
        '50d': 'http://openweathermap.org/img/wn/50d@2x.png',
        '50n': 'http://openweathermap.org/img/wn/50n@2x.png'
    }

    const id = Number(weatherCode);
    switch (id) {
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

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return { text: "Drizzle", icon: img['09d'] };
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return { text: "Rain", icon: Rain };
        case 511:
            return { text: "Freezing Rain", icon: FreezingRain };
        case 520:
        case 521:
        case 522:
        case 531:
            return { text: "ragged shower rain", icon: RainHeavy };
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            return { text: "Snow", icon: Snow };
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            return { text: "Fog", icon: Fog };
        case 800:
            return { text: "Clear", icon: Clear };
        case 801:
            return { text: "Cloudy", icon: Cloudy };
        case 802:
            return { text: "Cloudy", icon: Cloudy };
        case 803:
        case 804:
            return { text: "Partly Cloudy", icon: Cloudy };

        default:
            return 500;
    }
}

export default getIcon;
