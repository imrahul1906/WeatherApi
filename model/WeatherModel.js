import { requestConfig } from "../config/WeatherApiConfig.js";
import axios from "axios"
export class WeatherModel {

    constructor(cache) {
        this.cache = cache;
    }

    async getWeatherData(query, callback) {
        // Check if the data is present in cache.
        const location = query.location;
        const from = query.from;
        const to = query.to;

        const key = this.getKey(location, from, to);
        const cachedData = await this.cache.get(key);
        if (cachedData) {
            console.log('✅ X-Cache: HIT\n');
            // Redis stores string not json object
            callback(JSON.parse(cachedData));
            return;
        }

        // make a request to third party id data is not cached
        const path = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
        try {
            const config = requestConfig(path, from, to);

            const response = await axios(config);
            console.log('❌ X-Cache: MISS \n');
            // set data to cache. Redis stores strings.
            await this.cache.set(key, JSON.stringify(response.data));
            callback(response.data);
        } catch (error) {
            console.log(`api request was not successful ${error}`);
            throw new Error(error);
        }
    }

    getKey(location, from, to) {
        const dates = [];
        if (from) dates.push(from);
        if (to) dates.push(to);

        const key = `${location}:${dates.join(':')}`;
        return key;
    }
}