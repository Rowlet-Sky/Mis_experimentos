const API_KEY = 'ea467c6c99f94f55807192736241812';


const cities = [
    'Santo Domingo',
    'Punta Cana',
    'Santiago',
    'La Romana',
    'Puerto Plata',
    'San Pedro de Macoris'
];

async function fetchWeatherData() {
    const container = document.getElementById('weather-container');
    const lastUpdatedEl = document.getElementById('last-updated');
    
    try {
        container.innerHTML = ''; 

        
        const weatherPromises = cities.map(city => 
            fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)},Dominican Republic&lang=es&aqi=yes`)
            .then(response => response.json())
        );

        const weatherData = await Promise.all(weatherPromises);

        
        weatherData.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('location-card');
            
            card.innerHTML = `
                <h2 class="location-name">${data.location.name}</h2>
                <img src="${data.current.condition.icon}" alt="Clima" class="weather-icon">
                <div class="temperature">${Math.round(data.current.temp_c)}°C</div>
                <p>${data.current.condition.text}</p>
                <div class="extra-info">
                    <div>💧 Humedad: ${data.current.humidity}%</div>
                    <div>💨 Viento: ${Math.round(data.current.wind_kph)} km/h</div>
                    <div>☔ Lluvia: ${data.current.precip_mm}mm</div>
                    <div>🌡️ ST: ${Math.round(data.current.feelslike_c)}°C</div>
                </div>
            `;
            
            container.appendChild(card);
        });

        
        const now = new Date();
        lastUpdatedEl.textContent = `Última actualización: ${now.toLocaleString()}`;

    } catch (error) {
        container.innerHTML = '<div class="loading">Error al cargar los datos del clima. Por favor, intenta de nuevo más tarde.</div>';
        console.error('Error:', error);
    }
}

fetchWeatherData();

setInterval(fetchWeatherData, 5 * 60 * 1000);