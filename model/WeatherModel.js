import { requestConfig } from "../config/RequestConfig.js";
import axios from "axios"
export class WeatherModel {

    async getWeatherData({ location, from = null, to = null }, callback) {
        // we need to send request get request to third party APi.
        // syntac is as below
        // path  = https://weather.visualcrossing.com/[location]//VisualCrossingWebServices/rest/services/timeline/[location]
        // data1 and date2 are optional.
        // Query params = api_key

        const path = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
        try {
            const config = requestConfig(path, from, to);

            const response = await axios(config);
            callback(response.data);
        } catch (error) {
            console.log(`api request was not successful ${error}`);
            throw new Error(error);
        }

    }
}