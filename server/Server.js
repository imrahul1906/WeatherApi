import express from "express"
import { WeatherController } from "../controller/WeatherController.js";
import axios from "axios";
import { servrConfig } from "../config/SelfServerConfig.js";
import { ReddisCache } from "../cache/ReddisCache.js";
import rateLimit from 'express-rate-limit';

export class Server {
    constructor(options) {
        this.options = options;
        this.app = express();
    }

    async init() {
        this.setRateLimiter()


        // init cache
        const cache = new ReddisCache();
        await cache.connect();

        // init controller
        this.controller = new WeatherController(cache);
        this.setRoutes();
    }

    setRateLimiter() {
        // Limit each IP to 4 requests per minutes
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 4,
            message: 'Too many requests from this IP, please try again later.',
        });

        // Apply rate limiter to only '/weather' route.
        this.app.use('/weather', limiter);
    }

    setRoutes() {
        this.app.get('/weather', (req, res) => {
            this.controller.getWeather(req.query, res, async () => {
                await this.tearDown();
            });
        });
    }

    async startServer() {
        this.server = this.app.listen(3000, '0.0.0.0', async () => {
            console.log(`✅server is starting ...`);

            try {
                const config = servrConfig(
                    this.options.location,
                    'http://127.0.0.1',
                    3000,
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

    async tearDown() {
        await this.controller.tearDown();
        process.exit(1);
    }
}