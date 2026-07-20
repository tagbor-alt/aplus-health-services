const professionals = {
  "Physiotherapy": ["Dr. Ama Boateng", "Dr. Kojo Mensah", "Dr. Efua Owusu"],
  "Occupational Therapy": ["Dr. Nana Adjei", "Dr. Yaa Asante"],
  "Dietetics": ["Dr. Kwabena Osei", "Dr. Abena Darko"],
  "Psychology": ["Dr. Kwame Sarpong", "Dr. Akosua Frimpong"],
  "Respiratory Therapy": ["Dr. Yaw Appiah", "Dr. Adjoa Boadi"]
};

const params = new URLSearchParams(window.location.search);
const service = params.get("service") || "Physiotherapy";

document.getElementById("serviceTitle").textContent = service;

const profList = document.getElementById("profList");
let selectedProf = null;
let selectedVisitType = "Online";

(professionals[service] || ["Available Professional"]).forEach((name, i) => {
  const card = document.createElement("div");
  card.className = "prof-card";
  card.innerHTML = `<span class="prof-name">${name}</span><span class="prof-check">✓</span>`;
  card.addEventListener("click", () => {
    document.querySelectorAll(".prof-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedProf = name;
  });
  profList.appendChild(card);
  if (i === 0) { card.classList.add("selected"); selectedProf = name; }
});

document.querySelectorAll(".toggle-option").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedVisitType = btn.dataset.type;
  });
});

document.getElementById("confirmBtn").addEventListener("click", () => {
  const date = document.getElementById("apptDate").value;
  const time = document.getElementById("apptTime").value;

  if (!date || !time) {
    alert("Please choose a date and time.");
    return;
  }

  const summary = document.getElementById("confirmSummary");
  summary.style.display = "block";
  summary.innerHTML = `
    <p class="eyebrow">BOOKING CONFIRMED</p>
    <p><strong>${service}</strong> with ${selectedProf}</p>
    <p>${date} at ${time} · ${selectedVisitType}</p>
  `;
  summary.scrollIntoView({ behavior: "smooth" });
});