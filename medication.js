// ---- Time input rows ----
const timeList = document.getElementById("timeList");

function addTimeRow(value) {
  const row = document.createElement("div");
  row.className = "time-row";
  row.innerHTML = `
    <input type="time" class="med-time-input" value="${value || ""}">
    <button type="button" class="remove-time-btn">✕</button>
  `;
  row.querySelector(".remove-time-btn").addEventListener("click", () => row.remove());
  timeList.appendChild(row);
}

addTimeRow();

document.getElementById("addTimeBtn").addEventListener("click", () => addTimeRow());

// ---- Storage ----
function getMeds() {
  try {
    return JSON.parse(localStorage.getItem("medications")) || [];
  } catch {
    return [];
  }
}
function saveMeds(meds) {
  localStorage.setItem("medications", JSON.stringify(meds));
}

function renderMeds() {
  const meds = getMeds();
  const list = document.getElementById("medList");

  if (meds.length === 0) {
    list.innerHTML = `<p class="empty-state">No medications added yet.</p>`;
    return;
  }

  list.innerHTML = meds.map((m, i) => `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-date">${m.name}</span>
        <button class="delete-med-btn" data-index="${i}">Remove</button>
      </div>
      ${m.dosage ? `<p class="entry-mood">${m.dosage}</p>` : ""}
      <p class="entry-exercise">${m.times.join(", ")}</p>
    </div>
  `).join("");

  document.querySelectorAll(".delete-med-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const meds = getMeds();
      meds.splice(Number(btn.dataset.index), 1);
      saveMeds(meds);
      renderMeds();
    });
  });
}

document.getElementById("saveMedBtn").addEventListener("click", () => {
  const name = document.getElementById("medName").value.trim();
  const dosage = document.getElementById("medDosage").value.trim();
  const times = Array.from(document.querySelectorAll(".med-time-input"))
    .map(i => i.value)
    .filter(Boolean);

  if (!name || times.length === 0) {
    alert("Please enter a medication name and at least one time.");
    return;
  }

  const meds = getMeds();
  meds.push({ name, dosage, times });
  saveMeds(meds);

  document.getElementById("medName").value = "";
  document.getElementById("medDosage").value = "";
  timeList.innerHTML = "";
  addTimeRow();

  renderMeds();
});

renderMeds();

// ---- Notifications ----
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

function checkReminders() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  const today = now.toDateString();

  const meds = getMeds();
  meds.forEach(m => {
    if (m.times.includes(currentTime)) {
      const alertKey = `notified_${m.name}_${currentTime}_${today}`;
      if (!localStorage.getItem(alertKey)) {
        new Notification("Medication Reminder", {
          body: `Time to take ${m.name}${m.dosage ? ` (${m.dosage})` : ""}`
        });
        localStorage.setItem(alertKey, "true");
      }
    }
  });
}

setInterval(checkReminders, 30000);
checkReminders();