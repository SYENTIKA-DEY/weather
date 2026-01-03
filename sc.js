const apiKey = "2b2dda76c9b289aa5bf5dc6c0fb85536";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Current weather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            document.getElementById("weatherResult").style.display = "block";
            document.getElementById("city").innerText = data.name;
            document.getElementById("temperature").innerText =
                `🌡 Temperature: ${data.main.temp} °C`;
            document.getElementById("condition").innerText =
                `🌥 Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText =
                `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText =
                `🌬 Wind Speed: ${data.wind.speed} m/s`;

            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        });

    // 5-day forecast API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = "";

            // One forecast per day (every 24 hours)
            const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

            dailyForecast.slice(0, 5).forEach(day => {
                const date = new Date(day.dt_txt);
                const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

                forecastDiv.innerHTML += `
                    <div class="forecast-day">
                        <p>${dayName}</p>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                        <p>${Math.round(day.main.temp)}°C</p>
                    </div>
                `;
            });
        });
}