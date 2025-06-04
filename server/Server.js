import express from "express"
import { WeatherController } from "../controller/WeatherController.js";
import axios from "axios";
import { servrConfig } from "../config/SelfServerConfig.js";
import { ReddisCache } from "../cache/ReddisCache.js";

export class Server {
    constructor(options) {
        this.options = options;
        this.app = express();
    }

    async init() {
        // init cache
        const cache = new ReddisCache();
        await cache.connect();

        // init controller
        this.controller = new WeatherController(cache);
        this.setRoutes();
    }

    setRoutes() {
        this.app.get('/weather', (req, res) => {
            this.controller.getWeather(req.query);
        });
    }

    async startServer() {
        this.app.listen(3000, '0.0.0.0', async () => {
            console.log(`✅server is starting ...`);

            try {
                const config = servrConfig(
                    this.options.location,
                    'http://127.0.0.1',
                    this.port,
                    this.options.from,
                    this.options.to
                );
                const response = await axios(config);
                console.log(`my server response is : ${response.status}`);
            } catch (e) {
                throw new Error(e);
            }
        });

        this.app.on('error', (error) => {
            console.log(`error in connecting with server: ${error}`)
        })
    }
}