import { ReddisCache } from "../cache/ReddisCache.js";
import { WeatherModel } from "../model/WeatherModel.js";
import { WeatherView } from "../view/WeatherView.js";

export class WeatherController {
    constructor(cache) {
        this.model = new WeatherModel(cache);
        this.view = new WeatherView();
    }

    async getWeather(query, res, errorCallback) {
        this.model.getWeatherData(query, res, this.onWeatherDataReceived.bind(this), errorCallback);
    }

    onWeatherDataReceived(data) {
        this.view.setWeatherData(data);
    }

    async tearDown() {
        await this.model.tearDown();
    }
}