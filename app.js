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

// Fetch balloon data
fetch('public/locations/00.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(balloons => {
    console.log('Fetched balloons:', balloons);

    const markers = balloons.map(([lat, lng, alt]) => {
    const marker = L.marker([lat, lng], { icon: balloonIcon }).addTo(map);
      marker.bindPopup(`Altitude: ${alt} meters`);
      return marker;
    });

    // Fit map to all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds());
    }
  })
  .catch(err => console.error('Failed to fetch balloon data:', err));

// const map = L.map('map').setView([0, 0], 2);
// let balloons = [];
// fetch('/public/locations/00.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(balloons => {
//     balloons.forEach(balloon => {
//         console.log(balloon);
               
//         });
//   })
//   .catch(err => console.error('Failed to fetch treasure.json:', err));