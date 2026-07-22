const providers = [
  { name: "Dr. Ama Boateng", service: "Physiotherapy", lat: 5.5560, lng: -0.1969, area: "Osu" },
  { name: "Dr. Kojo Mensah", service: "Physiotherapy", lat: 5.6980, lng: -0.1670, area: "Adenta" },
  { name: "Dr. Nana Adjei", service: "Occupational Therapy", lat: 5.6500, lng: -0.1500, area: "East Legon" },
  { name: "Dr. Kwabena Osei", service: "Dietetics", lat: 5.5390, lng: -0.2670, area: "Dansoman" },
  { name: "Dr. Kwame Sarpong", service: "Psychology", lat: 5.6698, lng: -0.0166, area: "Tema" },
  { name: "Dr. Yaw Appiah", service: "Respiratory Therapy", lat: 5.6180, lng: -0.2350, area: "Achimota" },
  { name: "Dr. Efua Owusu", service: "Physiotherapy", lat: 5.5850, lng: -0.2400, area: "Dansoman" },
  { name: "Dr. Akosua Frimpong", service: "Psychology", lat: 5.5730, lng: -0.1450, area: "Labone" }
];

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function initMap(userLat, userLng) {
  const map = L.map('map').setView([userLat, userLng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  L.marker([userLat, userLng], {
    icon: L.divIcon({ className: 'user-marker', html: '<div class="user-dot"></div>' })
  }).addTo(map).bindPopup("You are here");

  const withDistance = providers.map(p => ({
    ...p,
    distance: distanceKm(userLat, userLng, p.lat, p.lng)
  })).sort((a, b) => a.distance - b.distance);

  withDistance.forEach(p => {
    L.marker([p.lat, p.lng])
      .addTo(map)
      .bindPopup(`<strong>${p.name}</strong><br>${p.service}<br>${p.area}`);
  });

  const listEl = document.getElementById("nearbyList");
  listEl.innerHTML = withDistance.map(p => `
    <div class="entry-card nearby-card">
      <div class="entry-top">
        <span class="entry-date">${p.area}</span>
        <span class="entry-pain">${p.distance.toFixed(1)} km</span>
      </div>
      <p class="entry-mood">${p.name}</p>
      <p class="entry-exercise">${p.service}</p>
      <a href="booking.html?service=${encodeURIComponent(p.service)}" class="btn-primary full-width" style="margin-top:10px; display:block; text-align:center; padding:10px;">Book</a>
    </div>
  `).join("");
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => initMap(pos.coords.latitude, pos.coords.longitude),
    () => initMap(5.6037, -0.1870)
  );
} else {
  initMap(5.6037, -0.1870);
}