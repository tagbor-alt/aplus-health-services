const services = [
  {
    name: "Physiotherapy",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#131B3A" stroke-width="2"><circle cx="12" cy="4" r="2"/><path d="M12 6v6l-4 8M12 12l4 8M8 10h8"/></svg>`
  },
  {
    name: "Occupational Therapy",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#131B3A" stroke-width="2"><path d="M12 2a5 5 0 0 1 5 5c0 2-2 3-2 5v2H9v-2c0-2-2-3-2-5a5 5 0 0 1 5-5z"/><path d="M9 18h6M10 22h4"/></svg>`
  },
  {
    name: "Dietetics",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#131B3A" stroke-width="2"><path d="M12 2v6M8 6a4 4 0 0 0 8 0M6 10h12l-1 10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/></svg>`
  },
  {
    name: "Psychology",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#131B3A" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-1 2-1 3.5V14a3 3 0 0 1-6 0v-4.5C9 8 8 7.5 8 6a4 4 0 0 1 4-4z"/><path d="M9 18h6"/></svg>`
  },
  {
    name: "Respiratory Therapy",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#131B3A" stroke-width="2"><path d="M6 4v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V4M6 4a2 2 0 1 0 0 4M18 4a2 2 0 1 1 0 4M12 14v6"/></svg>`
  }
];

const grid = document.getElementById("serviceGrid");

services.forEach(service => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<div class="icon">${service.icon}</div><h3>${service.name}</h3>`;
  card.addEventListener("click", () => {
    window.location.href = `booking.html?service=${encodeURIComponent(service.name)}`;
  });
  grid.appendChild(card);
});