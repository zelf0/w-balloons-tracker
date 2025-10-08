// const map = document.getElementById('map'); 
console.log("app.js loaded");

// Initialize map
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const balloonIcon = L.divIcon({
  className: 'balloon-marker',
  iconSize: [12, 12],   // small dot
  iconAnchor: [6, 6]    // center the dot
});

const currentMarkers = [];
let historyMarkers = [];

// Fetch balloon data
fetch('public/locations/00.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
    .then(balloons => {
    balloons.forEach((balloon, i) => {
      balloon.id = i; // give each balloon a unique id
      createBalloonMarker(balloon);
    });
    return balloons;
  })
    .catch(err => console.error('Failed to fetch balloon data:', err));
  

const historicalData = {}; // {hour: balloons[]}
for (let h = 1; h <= 23; h++) {
  fetch(`/public/locations/${String(h).padStart(2, '0')}.json`)
    .then(res => res.json())
    .then(data => { historicalData[h] = data; });
}


  function createBalloonMarker(balloon) {
  const marker = L.marker([balloon[0], balloon[1]], { icon: balloonIcon }).addTo(map);

  const popupContent = `
    <div class="popupContent">
      <p>Altitude: ${balloon[2].toFixed(2)} m</p>
      <button onclick="showHistory(${balloon.id})">Show 24 hour path</button>
    </div>
  `;

  marker.bindPopup(popupContent);
  currentMarkers.push(marker);
}

function showHistory(balloonId) {
  // Remove previous history markers
//   historyMarkers.forEach(m => map.removeLayer(m));
//   historyMarkers = [];

  for (let h = 1; h <= 23; h++) {
    const hourBalloons = historicalData[h];
    if (!hourBalloons) continue;
    const b = hourBalloons[balloonId];
    if (!b) continue;

    const histMarker = L.circleMarker([b[0], b[1]], {
  radius: 5,
  fillOpacity: 1,
  className: 'historyDot'
}).addTo(map);

    historyMarkers.push(histMarker);
  }
}
function showAllPaths() {
  // Remove previous history markers
  historyMarkers.forEach(m => map.removeLayer(m));
  historyMarkers = [];

  currentMarkers.forEach((marker, balloonId) => {
    // Add historical positions
    for (let h = 1; h <= 23; h++) {
      const hourBalloons = historicalData[h];
      if (!hourBalloons) continue;
      const b = hourBalloons[balloonId];
      if (!b) continue;

      const histMarker = L.circleMarker([b[0], b[1]], {
        radius: 5,
        fillOpacity: 0.55,
        className: 'historyDot'
      }).addTo(map);

      historyMarkers.push(histMarker);
    }
  });
}

function hideAllPaths() {
  historyMarkers.forEach(m => map.removeLayer(m));
  historyMarkers = [];
}

// Toggle handler for checkbox
function toggleAllPaths(checkbox) {
  if (checkbox.checked) {
    showAllPaths();
  } else {
    hideAllPaths();
  }
}