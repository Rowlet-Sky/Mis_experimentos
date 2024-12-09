const continentData = {
    'América del Norte': {
        population: '579 millones',
        countries: ['Estados Unidos', 'Canadá', 'México'],
        coordinates: [40, -100],
        zoom: 3,
        icon: 'CAN.jpg'
    },
    'América del Sur': {
        population: '422 millones',
        countries: ['Brasil', 'Argentina', 'Colombia', 'Perú', 'Venezuela', 'Chile', 'Ecuador'],
        coordinates: [-15, -60],
        zoom: 3,
        icon: 'CAS.jpg'
    },
    'Europa': {
        population: '748 millones',
        countries: ['Alemania', 'Francia', 'Reino Unido', 'Italia', 'España', 'Polonia', 'Suiza'],
        coordinates: [50, 10],
        zoom: 4,
        icon: 'CE.jpg'
    },
    'Asia': {
        population: '4.7 mil millones',
        countries: ['China', 'India', 'Indonesia', 'Pakistán', 'Bangladesh', 'Japón', 'Filipinas'],
        coordinates: [35, 100],
        zoom: 3,
        icon: 'CASI.jpg'
    },
    'África': {
        population: '1.4 mil millones',
        countries: ['Nigeria', 'Etiopía', 'Egipto', 'República Democrática del Congo', 'Sudáfrica', 'Tanzania'],
        coordinates: [0, 20],
        zoom: 3,
        icon: 'CA.jpg'
    },
    'Oceanía': {
        population: '43 millones',
        countries: ['Australia', 'Nueva Zelanda', 'Papúa Nueva Guinea', 'Fiji', 'Islas Salomón'],
        coordinates: [-25, 135],
        zoom: 4,
        icon: 'CO.jpg'
    }
};

const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function updateInfoPanel(continent) {
    const data = continentData[continent];
    const infoPanel = document.getElementById('info-panel');
    
    infoPanel.innerHTML = `
        <h2 class="continent-name">${continent}</h2>
        <div class="continent-info">
            <img src="${data.icon}" class="continent-icon" alt="Icono de ${continent}">
            <p class="continent-data"><strong>Población:</strong> ${data.population}</p>
            <p class="continent-data"><strong>Países principales:</strong></p>
            <p class="continent-data">${data.countries.join(', ')}</p>
        </div>
    `;
}

for (const continent in continentData) {
    const marker = L.marker(continentData[continent].coordinates)
        .addTo(map)
        .bindPopup(continent)
        .on('click', function() {
            map.setView(continentData[continent].coordinates, continentData[continent].zoom);
            updateInfoPanel(continent);
        });
}