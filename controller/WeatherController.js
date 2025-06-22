import { ReddisCache } from "../cache/ReddisCache.js";
import { WeatherModel } from "../model/WeatherModel.js";
import { WeatherView } from "../view/WeatherView.js";

export class WeatherController {
    constructor(cache) {
        this.model = new WeatherModel(cache);
        this.view = new WeatherView();
    }

    async getWeather(request, response) {
        const data = await this.model.getWeather(request);

        if (!data) {
            return response.status(404).json({
                success: false,
                message: "Cache miss",
                data: null
            });
        }

        return response.status(200).json({
            success: true,
            message: "Cache hit",
            data
        });
    }

    onWeatherDataReceived(data) {
        this.view.setWeatherData(data);
    }
}