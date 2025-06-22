import { WeatherModel } from "../model/WeatherModel.js";

export class WeatherController {
    constructor(cache) {
        this.model = new WeatherModel(cache);
    }

    async getWeather(request, response) {
        const data = await this.model.getWeather(request);

        if (data) {
            return response.status(200).json({
                success: true,
                message: "Weather data is fetched successfully~",
                data
            });
        }
    }
}