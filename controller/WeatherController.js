import { WeatherModel } from "../model/WeatherModel.js";
import { WeatherView } from "../view/WeatherView.js";

export class WeatherController {
    constructor() {
        this.model = new WeatherModel();
        this.view = new WeatherView();
    }

    getWeather(options) {
        this.model.getWeatherData(options, this.onWeatherDataReceived.bind(this));
    }

    onWeatherDataReceived(data) {
        this.view.setWeatherData(data);
    }
}