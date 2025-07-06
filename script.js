// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "a78c62fff38c42d3be274912250607"

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
       try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData);
       }
       catch(error){
        console.error(error)
        displayError(error)
       }
    }
    else{
        displayError("Please enter a city")
    }
})

async function getWeatherData(city) {
    
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json()
}

function displayWeatherInfo(data){
    
    const {
        location: { name: city },
        current: {
            temp_c,
            humidity,
            condition: { text, code }
        }
    } = data;

     card.textContent = "";
     card.style.display = "flex"

     const cityDisplay = document.createElement("h1");
     const tempDisplay = document.createElement("p");
     const humidityDisplay = document.createElement("p");
     const descDisplay = document.createElement("p");
     const weatherEmoji = document.createElement("p");

     cityDisplay.textContent = city;
     tempDisplay.textContent = `${temp_c}°C`
     humidityDisplay.textContent = `humidity : ${humidity}%`
     descDisplay.textContent = text
     weatherEmoji.textContent = getWeatherEmoji(code)
     

     cityDisplay.classList.add("cityDisplay")
     tempDisplay.classList.add("tempDisplay")
     humidityDisplay.classList.add("humidityDisplay");
     descDisplay.classList.add("descDisplay")
     weatherEmoji.classList.add("weatherEmoji")

     card.appendChild(cityDisplay)
     card.appendChild(tempDisplay)
     card.appendChild(humidityDisplay)
     card.appendChild(descDisplay)
     card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId === 1000):
            return "☀️"; // Clear/Sunny

        case (weatherId === 1003):
            return "⛅"; // Partly Cloudy

        case (weatherId === 1006 || weatherId === 1009):
            return "☁️"; // Cloudy

        case (weatherId >= 1063 && weatherId <= 1087):
            return "🌦️"; // Chance of rain/thunder

        case (weatherId >= 1150 && weatherId <= 1201):
            return "🌧️"; // Light to moderate rain

        case (weatherId >= 1210 && weatherId <= 1225):
            return "🌨️"; // Snow

        case (weatherId >= 1240 && weatherId <= 1246):
            return "🌧️"; // Showers

        case (weatherId >= 1273 && weatherId <= 1282):
            return "⛈️"; // Thunderstorms

        default:
            return "❓"; // Default/fallback
    }
}

function displayError(message){

   const errorDisplay = document.createElement("p")
   errorDisplay.textContent = message;
   errorDisplay.classList.add("errorDisplay");

   card.textContent = "";
   card.style.display = "flex";
   card.appendChild(errorDisplay)
}