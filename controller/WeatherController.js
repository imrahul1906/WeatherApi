import { ReddisCache } from "../cache/ReddisCache.js";
import { WeatherModel } from "../model/WeatherModel.js";
import { WeatherView } from "../view/WeatherView.js";

export class WeatherController {
    constructor(cache) {
        this.model = new WeatherModel(cache);
        this.view = new WeatherView();
    }

    getWeather(query) {
        this.model.getWeatherData(query, this.onWeatherDataReceived.bind(this));
    }

    onWeatherDataReceived(data) {
        this.view.setWeatherData(data);
    }
}