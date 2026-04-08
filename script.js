async function getWeather() {
    const city = document.getElementById("city_input").value;
    const apiKey = "aa5f07c7db216f4d8f6f3adf89d35cf9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherBox = document.querySelector(".weather_info");
    const errorBox = document.querySelector(".error_message");

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);


        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind_speed").textContent = `${data.wind.speed} km/h`;


        const icon = document.getElementById("weather_icon");
        const condition = data.weather[0].main;


        if (condition === "Clear") {
            icon.src = "sun.png";
        } else if (condition === "Clouds") {
            icon.src = "cloud.png";
        } else if (condition === "Rain") {
            icon.src = "rain.png";
        } else {
            icon.src = "weath.png";
        }


        weatherBox.style.display = "block";
        errorBox.style.display = "none";

    } catch (error) {

        weatherBox.style.display = "none";
        errorBox.style.display = "block";
        errorBox.textContent = "❌Invalid City Name. Please try again.";
    }
}

document.getElementById("search_btn").addEventListener("click", getWeather);