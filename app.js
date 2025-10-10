// Initialize the map
const map = L.map("map").setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// const altitudeColorStops = [
//   { alt: 2,   color: "#ff0000" }, // dark orange
//   { alt: 4,   color: "#ff8800" }, // orange
//   { alt: 6,   color: "#ffff00" }, // yellow
//   { alt: 8,   color: "#88ff00" }, // lime green
//   { alt: 10,  color: "#00ff00" }, // bluish green
//   { alt: 12,  color: "#00ff88" }, // cyan
//   { alt: 14,  color: "#0088ff" }, // blue
//   { alt: 16,  color: "#0000ff" }, // indigo
//   { alt: 18,  color: "#8800ff" }, // purple
//   { alt: 20,  color: "#ff00ff" }, // magenta
// ];

const altitudeColorStops = [
  { alt: 2, color: "#ee4444" }, // dark orange
  { alt: 4, color: "#ee8844" }, // orange
  { alt: 6, color: "#eeee44" }, // yellow
  { alt: 8, color: "#88ee44" }, // lime green
  { alt: 10, color: "#44ee88" }, // bluish green
  //   { alt: 12,  color: "#44dd88" }, // cyan
  { alt: 14, color: "#4488ee" }, // blue
  { alt: 16, color: "#4444ee" }, // indigo
  { alt: 19, color: "#8844ee" }, // purple
  { alt: 21, color: "#dd00dd" }, // magenta
];

//Test colors
// const test = document.getElementById('test');
// document.getElementById('test').innerHTML =
// `
// <p style = {color: "green"}> 0 </p>
// <div style = "background-color: ${getColorForAltitude(1)}"> 1 </div>
// <div style = "background-color: ${getColorForAltitude(2)}"> 2 </div>
// <div style = "background-color: ${getColorForAltitude(2.5)}"> 2.5 </div>
// <div style = "background-color: ${getColorForAltitude(3)}"> 3 </div>
// <div style = "background-color: ${getColorForAltitude(3.5)}"> 3.5 </div>
// <div style = "background-color: ${getColorForAltitude(4)}"> 4 </div>
// <div style = "background-color: ${getColorForAltitude(4.5)}"> 4.5 </div>
// <div style = "background-color: ${getColorForAltitude(5)}"> 5 </div>
// <div style = "background-color: ${getColorForAltitude(5.5)}"> 5.5 </div>
// <div style = "background-color: ${getColorForAltitude(6)}"> 6 </div>
// <div style = "background-color: ${getColorForAltitude(6.5)}"> 6.5 </div>
// <div style = "background-color: ${getColorForAltitude(7)}"> 7 </div>
// <div style = "background-color: ${getColorForAltitude(7.5)}"> 7.5 </div>
// <div style = "background-color: ${getColorForAltitude(8)}"> 8 </div>
// <div style = "background-color: ${getColorForAltitude(8.5)}"> 8.5 </div>
// <div style = "background-color: ${getColorForAltitude(9)}"> 9 </div>
// <div style = "background-color: ${getColorForAltitude(9.5)}"> 9.5 </div>
// <div style = "background-color: ${getColorForAltitude(10)}"> 10 </div>
// <div style = "background-color: ${getColorForAltitude(10.5)}"> 10.5 </div>
// <div style = "background-color: ${getColorForAltitude(11)}"> 11 </div>
// <div style = "background-color: ${getColorForAltitude(11.5)}"> 11.5 </div>
// <div style = "background-color: ${getColorForAltitude(12)}"> 12 </div>
// <div style = "background-color: ${getColorForAltitude(12.5)}"> 12.5 </div>
// <div style = "background-color: ${getColorForAltitude(13)}"> 13 </div>
// <div style = "background-color: ${getColorForAltitude(13.5)}"> 13.5 </div>
// <div style = "background-color: ${getColorForAltitude(14)}"> 14 </div>
// <div style = "background-color: ${getColorForAltitude(14.5)}"> 14.5 </div>
// <div style = "background-color: ${getColorForAltitude(15)}"> 15 </div>
// <div style = "background-color: ${getColorForAltitude(15.5)}"> 15.5 </div>
// <div style = "background-color: ${getColorForAltitude(16)}"> 16 </div>
// <div style = "background-color: ${getColorForAltitude(16.5)}"> 16.5 </div>
// <div style = "background-color: ${getColorForAltitude(17)}"> 17 </div>
// <div style = "background-color: ${getColorForAltitude(17.5)}"> 17.5 </div>
// <div style = "background-color: ${getColorForAltitude(18)}"> 18 </div>
// <div style = "background-color: ${getColorForAltitude(18.5)}"> 18.5 </div>
// <div style = "background-color: ${getColorForAltitude(19)}"> 19 </div>
// <div style = "background-color: ${getColorForAltitude(19.5)}"> 19.5 </div>
// <div style = "background-color: ${getColorForAltitude(20)}"> 20 </div>
// <div style = "background-color: ${getColorForAltitude(21)}"> 21 </div>
// <div style = "background-color: ${getColorForAltitude(25)}"> 25 </div>
// `

// Helper: Convert hex to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper: Interpolate two RGB colors
function interpColor(c1, c2, t) {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

// Helper: Convert RGB to hex
function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Main function: get color for altitude
function getColorForAltitude(alt) {
  if (alt <= altitudeColorStops[0].alt) return altitudeColorStops[0].color;
  if (alt >= 20) return "#ff00ff"; // magenta for 20+

  for (let i = 0; i < altitudeColorStops.length - 1; i++) {
    const stop1 = altitudeColorStops[i];
    const stop2 = altitudeColorStops[i + 1];
    if (alt >= stop1.alt && alt < stop2.alt) {
      const t = (alt - stop1.alt) / (stop2.alt - stop1.alt);
      const c1 = hexToRgb(stop1.color);
      const c2 = hexToRgb(stop2.color);
      return rgbToHex(interpColor(c1, c2, t));
    }
  }
  // fallback
  return altitudeColorStops[altitudeColorStops.length - 1].color;
}

const balloonIcon = L.divIcon({
  className: "balloon-marker",
  iconSize: [20, 20], // small dot
  iconAnchor: [10, 10], // center the dot
});

const currentMarkers = [];
let historyMarkers = [];

// Fetch balloon data
async function fetchAndDisplayBalloons() {
  try {
    const res = await fetch("public/locations/00.json");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const balloons = await res.json();
    for (let i = 0; i < balloons.length; i++) {
      const balloon = balloons[i];
      balloon.id = i; // give each balloon a unique id
      createBalloonMarker(balloon);
    }
    // showWinds(balloons)
  } catch (err) {
    console.error("Failed to fetch balloon data:", err);
  }
}

fetchAndDisplayBalloons();

const historicalData = {}; // {hour: balloons[]}
for (let h = 1; h <= 23; h++) {
  fetch(`public/locations/${String(h).padStart(2, "0")}.json`)
    .then((res) => res.json())
    .then((data) => {
      historicalData[h] = data;
    });
}

function createBalloonMarker(balloon) {
  //   const marker = L.marker([balloon[0], balloon[1]], { icon: balloonIcon, color: getColorForAltitude(balloon[2]) }).addTo(map);
  const marker = L.circleMarker([balloon[0], balloon[1]], {
    radius: 8,
    color: "white", // border color
    fillColor: getColorForAltitude(balloon[2]), // fill color
    fillOpacity: 0.8,
    weight: 2,
    className: "balloonIcon",
  }).addTo(map);

  //   const popupContent = `
  //     <div class="popupContent">
  //       <p>Altitude: ${balloon[2].toFixed(2)} m</p>
  //       <button onclick="showHistory(${balloon.id})">Show 24 hour path</button>
  //     </div>
  //   `;
  marker.bindPopup("loading...", { className: "popup" });
  marker.on("popupopen", function (e) {
    showHistory(balloon.id);
    // Show loading indicator
    marker.setPopupContent(`Altitude: ${balloon[2]}km Loading wind data...`, {
      className: "popup",
    });
    // const windUrl = `https://api.open-meteo.com/v1/forecast?latitude=${balloon[0]}&longitude=${balloon[1]}&current=wind_speed_200hPa,wind_direction_200hPa`;
    showWind(balloon, marker);

    //   marker.setPopupContent(content);
  });
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
      fillOpacity: 0.55,
      className: "historyDot",
      color: getColorForAltitude(b[2]), // border color
      fillColor: getColorForAltitude(b[2]), // fill color
      weight: 2,
    }).addTo(map);
    histMarker.bindPopup(`Hour -${h}<br> Altitude: ${b[2]} m`, {
      className: "popup",
    });
    historyMarkers.push(histMarker);
  }
}

function showAllPaths() {
  // Remove previous history markers
  historyMarkers.forEach((m) => map.removeLayer(m));
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
        className: "historyDot",
        color: getColorForAltitude(b[2]), // border color
        fillColor: getColorForAltitude(b[2]), // fill color
        weight: 2,
      }).addTo(map);

      historyMarkers.push(histMarker);
    }
  });
}

map.on("zoomend", function () {
  var currentZoom = map.getZoom();
  // Iterate through your circle markers and update their radius
  currentMarkers.forEach((marker) => {
    if (currentZoom > 0) {
      marker.setStyle({ weight: (currentZoom - 3.5) * 2 });
    }

    marker.setRadius((currentZoom - 3) * 2 + 10);
  });
  // historyMarkers.forEach(marker => {
  //     marker.setStyle({ weight: 1 + (currentZoom)});
  // })

  console.log("Zoom level changed to:", currentZoom);
});

function hideAllPaths() {
  historyMarkers.forEach((m) => map.removeLayer(m));
  historyMarkers = [];
}

function hideWinds() {
  historyMarkers.forEach((m) => map.removeLayer(m));
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

function toggleWind(checkbox) {
  if (checkbox.checked) {
    showWinds(balloons);
  } else {
    hideAllPaths();
  }
}

function showWinds(balloons) {
  for (let i = 0; i < balloons.length; i++) {
    showWind(balloons[i]);
  }
}

async function showWind(balloon, marker) {
  const windUrl = `https://api.open-meteo.com/v1/forecast?latitude=${balloon[0]}&longitude=${balloon[1]}&current=wind_speed_200hPa,wind_direction_200hPa,wind_speed_300hPa,wind_direction_300hPa,wind_speed_500hPa,wind_direction_500hPa,wind_speed_700hPa,wind_direction_700hPa`;
  console.log("Fetching wind for balloon", balloon.id, windUrl);
  const windRes = await fetch(windUrl);
  const windData = await windRes.json();
  const wind = windData.current;

  if (wind.wind_speed_200hPa != null && wind.wind_direction_200hPa != null) {
    let lat = balloon[0];
    let lon = balloon[1];
    const angleRad =
      (((wind.wind_direction_200hPa + 180) % 360) * Math.PI) / 180; //flip angle to get direction speed is going in
    const arrowLength = 0.2 * wind.wind_speed_200hPa; // Adjust scale for visibility
    console.log(wind.wind_direction_200hPa);
    console.log(angleRad);
    console.log(
      "blue speed: ",
      wind.wind_speed_200hPa,
      "arrow length",
      arrowLength,
    );

    const endLat = lat + arrowLength * Math.cos(angleRad);
    const endLon = lon + arrowLength * Math.sin(angleRad);

    L.polyline(
      [
        [lat, lon],
        [endLat, endLon],
      ],
      {
        color: getColorForAltitude(12),
        weight: 10,
        opacity: 0.75,
      },
    ).addTo(map);
  }
  if (wind.wind_speed_300hPa != null && wind.wind_direction_300hPa != null) {
    let lat = balloon[0];
    let lon = balloon[1];

    const angleRad =
      (((wind.wind_direction_300hPa + 180) % 360) * Math.PI) / 180; //flip angle to get direction speed is going in
    const arrowLength = 0.2 * wind.wind_speed_300hPa; // Adjust scale for visibility
    console.log(
      "green speed: ",
      wind.wind_speed_300hPa,
      "arrow length",
      arrowLength,
    );
    const endLat = lat + arrowLength * Math.cos(angleRad);
    const endLon = lon + arrowLength * Math.sin(angleRad);

    L.polyline(
      [
        [lat, lon],
        [endLat, endLon],
      ],
      {
        color: getColorForAltitude(9),
        weight: 10,
        opacity: 0.75,
      },
    ).addTo(map);
  }
  if (wind.wind_speed_500hPa != null && wind.wind_direction_500hPa != null) {
    let lat = balloon[0];
    let lon = balloon[1];

    const angleRad =
      (((wind.wind_direction_500hPa + 180) % 360) * Math.PI) / 180; //flip angle to get direction speed is going in
    //  const angleRad = ((270 + 180) % 360) * Math.PI / 180; //test angles display correctly
    const arrowLength = 0.2 * wind.wind_speed_500hPa; // Adjust scale for visibility
    console.log(
      "orange speed: ",
      wind.wind_speed_500hPa,
      "arrow length",
      arrowLength,
    );
    const endLat = lat + arrowLength * Math.cos(angleRad);
    const endLon = lon + arrowLength * Math.sin(angleRad);

    L.polyline(
      [
        [lat, lon],
        [endLat, endLon],
      ],
      {
        color: getColorForAltitude(5.5),
        weight: 10,
        opacity: 0.75,
      },
    ).addTo(map);
  }

  if (wind.wind_speed_700hPa != null && wind.wind_direction_700hPa != null) {
    let lat = balloon[0];
    let lon = balloon[1];

    const angleRad =
      (((wind.wind_direction_700hPa + 180) % 360) * Math.PI) / 180; //flip angle to get direction speed is going in
    console.log("700hPa angleRad:", angleRad);
    const arrowLength = 0.2 * wind.wind_speed_700hPa; // Adjust scale for visibility
    console.log(
      "red speed: ",
      wind.wind_speed_700hPa,
      "arrow length",
      arrowLength,
    );
    
    // testRadial(lat, lon);

    const endLat = lat + arrowLength * Math.cos(angleRad);
    const endLon =
      lon + (arrowLength * Math.sin(angleRad)) / Math.cos((lat * Math.PI) / 180);
    L.polyline(
      [
        [lat, lon],
        [endLat, endLon],
      ],
      {
        color: getColorForAltitude(3),
        weight: 10,
        opacity: 0.75,
      },
    ).addTo(map);
  }
  const content = `
        <strong>Balloon ${balloon.id}</strong>
        <p> Altitude: ${balloon[2]}km </p>
        <div style="background-color: ${getColorForAltitude(3)}; border-radius: 5px; opacity: 0.55;")>
        Wind at 700 hPa (~3 km): ${wind.wind_speed_700hPa ?? "N/A"} m/s, ${(wind.wind_direction_700hPa + 180) % 360 ?? "N/A"}°
        </div>
         <div style="background-color: ${getColorForAltitude(5.5)}; border-radius: 5px; opacity: 0.55;")>
          Wind at 500 hPa (~5.5 km): ${wind.wind_speed_500hPa ?? "N/A"} m/s, ${(wind.wind_direction_500hPa + 180) % 360 ?? "N/A"}°
        </div>
             <div style="background-color: ${getColorForAltitude(9)}; border-radius: 5px; opacity: 0.55;")>
            Wind at 300 hPa (~9 km): ${wind.wind_speed_300hPa ?? "N/A"} m/s, ${(wind.wind_direction_300hPa + 180) % 360 ?? "N/A"}°
        </div>
             <div style="background-color: ${getColorForAltitude(12)}; border-radius: 5px; opacity: 0.55;")>
              Wind at 200 hPa (~12 km): ${wind.wind_speed_200hPa ?? "N/A"} m/s, ${(wind.wind_direction_200hPa + 180) % 360 ?? "N/A"}°
        </div>
      `;
  marker.setPopupContent(content);
  //  return [wind.wind_speed_200hPa, wind.wind_direction_200hPa, wind.wind_speed_300hPa, wind.wind_direction_300hPa, wind.wind_speed_500hPa, wind.wind_direction_500hPa, wind.wind_speed_700hPa, wind.wind_direction_700hPa];
}


function testRadial(lat, lon) {
    const arrowlength = 10;
    for (let i = 0; i < 6.28; i += 0.08) {
    arrowLength = 10;
    console.log(i);
    const endLat = lat + arrowLength * Math.cos(i);
    const endLon =
      lon + (arrowLength * Math.sin(i)) / Math.cos((lat * Math.PI) / 180);

    L.polyline(
      [
        [lat, lon],
        [endLat, endLon],
      ],
      {
        color: getColorForAltitude(i * 3),
        weight: 10,
        opacity: 0.75,
      },
    ).addTo(map);
  }
}