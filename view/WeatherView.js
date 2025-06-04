export class WeatherView {
    setWeatherData(data) {
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
}
