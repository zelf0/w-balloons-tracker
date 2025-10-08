const map = document.getElementById('map'); 
let balloons = [];
fetch('/public/locations/00.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(balloons => {
    balloons.forEach(balloon => {
        console.log(balloon);
        // const marker = document.createElement('div');
        // marker.className = 'marker';
        // marker.style.left = `${balloon.x}px`;
        // marker.style.top = `${balloon.y}px`;
        // marker.title = balloon.name;
        // map.appendChild(marker);
        });
  })
  .catch(err => console.error('Failed to fetch treasure.json:', err));