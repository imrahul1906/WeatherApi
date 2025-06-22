import { requestConfig } from "../config/WeatherApiConfig.js";
import axios from "axios"
export class WeatherModel {

    constructor(cache) {
        this.cache = cache;
    }

    async getWeatherFromCache(key) {
        const cachedData = await this.cache.get(key);
        if (cachedData) {
            console.log('✅ X-Cache: HIT\n');
        } else {
            console.log('❌ X-Cache: MISS \n');
        }

        return cachedData ? JSON.parse(cachedData) : null;
    }

    async fetchWeatherData(location, from, to, key) {
        // make a request to third party id data is not cached
        const path = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
        try {
            const config = requestConfig(path, from, to);
            const response = await axios(config);
            // set data to cache. Redis stores strings.
            await this.cache.set(key, JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            const responseCode = error.response.status;
            console.log(`Error code : ${responseCode}`)
            if (responseCode == 400) {
                console.log('❌ The format of the API is incorrect or an invalid parameter or combination of parameters was supplied');
            } else if (responseCode == 401) {
                console.log('❌ There is a problem with the API key, account or subscription. May also be returned if a feature is requested for which the account does not have access to.')
            } else if (responseCode == 404) {
                console.log('❌ The request cannot be matched to any valid API request endpoint structure.');
            } else if (responseCode == 429) {
                console.log('❌ The account has exceeded their assigned limits. See What is the cause of “Maximum concurrent jobs has been exceeded”, HTTP response 429');
            } else if (responseCode == 500) {
                console.log('❌ A general error has occurred processing the request.')
            }
        }
    }

    async getWeather(request) {
        // Check if the data is present in cache.
        const location = request.query.location;
        const from = request.query.from;
        const to = request.query.to;
        const key = this.getKey(location, from, to);

        let data = await this.getWeatherFromCache(key);

        if (data) {
            return data;
        }

        data = await this.fetchWeatherData(location, from, to, key);
        return data;
    }

    getKey(location, from, to) {
        const dates = [];
        if (from) dates.push(from);
        if (to) dates.push(to);

        const key = `${location}:${dates.join(':')}`;
        return key;
    }
}