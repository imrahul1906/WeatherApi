import { requestConfig } from "../config/WeatherApiConfig.js";
import axios from "axios"
export class WeatherModel {

    constructor(cache) {
        this.cache = cache;
    }

    async getWeatherData(query, res, callback, errorCallback) {
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
            // [Optional] send the data back to client .
            res.send(cachedData);
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
            res.send(response.data);
            callback(response.data);
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
            errorCallback();
        }
    }

    getKey(location, from, to) {
        const dates = [];
        if (from) dates.push(from);
        if (to) dates.push(to);

        const key = `${location}:${dates.join(':')}`;
        return key;
    }

    async tearDown() {
        await this.cache.tearDown();
    }
}