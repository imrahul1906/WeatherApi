## Weather API
This is a CLI tool that acts as a caching proxy between the client and a third-party weather API server. It is designed to improve efficiency, reduce unnecessary external API calls, and enforce request limits to protect your system.

![image](https://github.com/user-attachments/assets/ee81dd1b-dabd-4120-8b49-4402cab72396)

## Features
- **Smart Caching:**
Responses are cached based on request parameters (e.g., location, date range).
If an identical request is made again, the tool returns the cached response, avoiding external API calls.

- **Rate Limiting:**
Limits client requests to a maximum of 4 requests per minute.
Prevents abuse and ensures fair usage.

- **Environment-based Configuration:**
API keys, hostnames, and port numbers are stored securely in environment variables for easy configuration and better security.

## 🛠️ How It Works
1. The CLI tool initializes a proxy server.
2. When a request is received
   - If the request is found in the cache, the cached response is returned.
   - If not, it forwards the request to the third-party weather API, caches the response, and returns it to the client.
   - A rate limiter is applied to restrict excessive API calls from clients.
3. Configuration is pulled from .env variables including:
   - Third-party API key
   - Host and port configuration for the cache server
  
## Prerequisites-

- **[Node.js](https://nodejs.org/)**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imrahul1906/WeatherApi.git
   cd weather_api
   ```

2. Install the node dependencies:
   ```bash
   npm install
   ```
3. Create an .env file with API-key in the following format
   ```bash
   API_KEY=DKSGNKDJFNKJDFGN*******
   ```
4. **[If windows ]** Install docker and start the Redis server
    ```bash
    docker run --name redis-server -p 6379:6379 -d redis
    ```

## Usage

### Test weather API service

To start the caching proxy server, run the following command:

```bash
 node cli.js weather --location <ex- delhi> --from <ex: '2025-06-02'> --to <ex: '2025-06-06'>
```
- `--location`: The location for which you want the weather report.
- `--from`: [optional] date "from"
- `--to`: [optional] date "to"
  
Example:

```bash
 node cli.js weather --location noida --from '2025-06-02' --to '2025-06-06'
```
localhost check:
```bash
http://localhost:3000/weather?location=alwar&from=2025-06-02&to=2025-06-02
```

## CC
https://roadmap.sh/projects/weather-api-wrapper-service
