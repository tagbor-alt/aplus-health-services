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
let currentUid = null;

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUid = user.uid;
});

(professionals[service] || ["Available Professional"]).forEach((name, i) => {
  const card = document.createElement("div");
  card.className = "prof-card";
  card.innerHTML = `<span class="prof-name">${name}</span><span class="prof-rating" data-name="${name}">Loading...</span><span class="prof-check">✓</span>`;

  db.collection("reviews").where("professional", "==", name).get().then(snapshot => {
    const ratingEl = card.querySelector(".prof-rating");
    if (snapshot.empty) {
      ratingEl.textContent = "No reviews yet";
      return;
    }
    const stars = snapshot.docs.map(d => d.data().stars);
    const avg = (stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(1);
    ratingEl.textContent = `★ ${avg} (${stars.length})`;
  }).catch(() => {
    card.querySelector(".prof-rating").textContent = "";
  });

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

  if (!currentUid) {
    alert("Please wait a moment and try again.");
    return;
  }

  db.collection("bookings").add({
    uid: currentUid,
    service: service,
    professional: selectedProf,
    date: date,
    time: time,
    visitType: selectedVisitType,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    const icsContent = generateICS(service, selectedProf, date, time, selectedVisitType);
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const icsUrl = URL.createObjectURL(blob);

    const summary = document.getElementById("confirmSummary");
    summary.style.display = "block";
    summary.innerHTML = `
      <p class="eyebrow">BOOKING CONFIRMED</p>
      <p><strong>${service}</strong> with ${selectedProf}</p>
      <p>${date} at ${time} · ${selectedVisitType}</p>
      <a href="${icsUrl}" download="appointment.ics" class="btn-primary full-width" style="margin-top:14px; display:block; text-align:center;">Add to Calendar</a>
    `;
    summary.scrollIntoView({ behavior: "smooth" });
    document.getElementById("reviewSection").style.display = "block";
  }).catch(err => {
    alert("Could not save booking: " + err.message);
  });
});

function pad(n) { return n.toString().padStart(2, "0"); }

function formatICSDate(date) {
  return date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) + "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) + "Z";
}

function generateICS(service, professional, dateStr, timeStr, visitType) {
  const start = new Date(`${dateStr}T${timeStr}:00`);
  const end = new Date(start.getTime() + 45 * 60000);

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//A+ Health Services//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@aplushealthservices`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${service} Appointment - ${professional}`,
    `DESCRIPTION:${visitType} appointment with ${professional} for ${service}.`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return icsContent;
}

let selectedStars = 0;

document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    selectedStars = Number(star.dataset.star);
    document.querySelectorAll(".star").forEach(s => {
      s.classList.toggle("filled", Number(s.dataset.star) <= selectedStars);
    });
  });
});

document.getElementById("submitReviewBtn").addEventListener("click", () => {
  if (selectedStars === 0) {
    alert("Please select a star rating.");
    return;
  }

  db.collection("reviews").add({
    uid: currentUid,
    professional: selectedProf,
    service: service,
    stars: selectedStars,
    text: document.getElementById("reviewText").value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("reviewSection").innerHTML = `<p class="save-note">Thanks for your review!</p>`;
  });
});