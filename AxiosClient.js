import axios from "axios";
import { serverConfig } from "./config/SelfServerConfig.js";

export class AxiosClient {

    constructor(options) {
        this.options = options;
    }

    async getWeather() {
        const config = serverConfig(
            this.options.location,
            'http://127.0.0.1',
            3000,
            this.options.from,
            this.options.to
        );

        const response = await this.makeRequest(config);

        const output = await this.beautifyOutput(response.data);
    }

    async beautifyOutput(responseData) {
        const data = responseData.data;
        console.log(`📍 Location: ${data.resolvedAddress}`);
        console.log(`🕒 Timezone: ${data.timezone}`);
        console.log(`📝 Forecast Summary: ${data.description}\n`);

        data.days.forEach(day => {
            console.log(`📅 ${day.datetime}`);
            console.log(`   🌡️  Temp: ${day.tempmin}°C - ${day.tempmax}°C`);
            console.log(`   💧 Humidity: ${day.humidity}%`);
            console.log(`   🌧️  Precipitation: ${day.precip}mm`);
            console.log(`   🌥️  Conditions: ${day.conditions}`);
            console.log('');
        });
    }


    async makeRequest(config) {
        try {
            const response = await axios(config);
            return response;
        } catch (error) {
            console.log(`error in making request: ${error}`)
        }
    }
}