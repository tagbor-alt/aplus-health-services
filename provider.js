const clients = ["Kojo Owusu", "Adwoa Mensima", "Samuel Tetteh", "Efua Asante"];

const mockAppointments = [
  { time: "9:00 AM", client: "Kojo Owusu", type: "In-person" },
  { time: "11:30 AM", client: "Adwoa Mensima", type: "Online" },
  { time: "2:00 PM", client: "Samuel Tetteh", type: "Home visit" }
];

// ---- Tabs ----
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tab-panel").forEach(p => p.style.display = "none");
    document.getElementById(`panel-${btn.dataset.tab}`).style.display = "block";
  });
});

// ---- Appointments ----
const apptList = document.getElementById("apptList");
apptList.innerHTML = mockAppointments.map(a => `
  <div class="entry-card">
    <div class="entry-top">
      <span class="entry-date">${a.time}</span>
      <span class="entry-pain">${a.type}</span>
    </div>
    <p class="entry-mood">${a.client}</p>
  </div>
`).join("");

// ---- Clients ----
const clientList = document.getElementById("clientList");
clients.forEach(name => {
  const card = document.createElement("div");
  card.className = "prof-card";
  card.innerHTML = `<span class="prof-name">${name}</span><span class="prof-check">›</span>`;
  clientList.appendChild(card);
});

// ---- Notes ----
const noteSelect = document.getElementById("noteClientSelect");
clients.forEach(name => {
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  noteSelect.appendChild(opt);
});

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem("providerNotes")) || [];
  } catch {
    return [];
  }
}
function saveNotes(notes) {
  localStorage.setItem("providerNotes", JSON.stringify(notes));
}
function renderNotes() {
  const notes = getNotes();
  const list = document.getElementById("notesList");
  if (notes.length === 0) {
    list.innerHTML = `<p class="empty-state">No notes saved yet.</p>`;
    return;
  }
  list.innerHTML = notes.slice().reverse().map(n => `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-date">${n.date}</span>
        <span class="entry-pain">${n.client}</span>
      </div>
      <p class="entry-notes">${n.text}</p>
    </div>
  `).join("");
}

document.getElementById("saveNoteBtn").addEventListener("click", () => {
  const text = document.getElementById("noteText").value.trim();
  if (!text) return;

  const notes = getNotes();
  notes.push({
    date: new Date().toLocaleString(),
    client: noteSelect.value,
    text
  });
  saveNotes(notes);
  document.getElementById("noteText").value = "";
  renderNotes();
});

renderNotes();

// ---- Availability ----
document.querySelectorAll(".day-opt").forEach(btn => {
  btn.addEventListener("click", () => btn.classList.toggle("active"));
});

document.getElementById("saveAvailBtn").addEventListener("click", () => {
  const days = Array.from(document.querySelectorAll(".day-opt.active")).map(b => b.dataset.day);
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  if (days.length === 0 || !start || !end) {
    alert("Please select at least one day and set your working hours.");
    return;
  }

  localStorage.setItem("providerAvailability", JSON.stringify({ days, start, end }));
  alert("Availability saved.");
});

// ---- Profile + Photo ----
function getProviderProfile() {
  try {
    return JSON.parse(localStorage.getItem("providerProfile")) || {};
  } catch {
    return {};
  }
}

function applyProfileToHeader(profile) {
  const nameEl = document.getElementById("providerName");
  const avatarImg = document.getElementById("avatarImg");
  const avatarInitial = document.getElementById("avatarInitial");

  if (profile.name) nameEl.textContent = profile.name;

  if (profile.photo) {
    avatarImg.src = profile.photo;
    avatarImg.style.display = "block";
    avatarInitial.style.display = "none";
  } else {
    avatarImg.style.display = "none";
    avatarInitial.style.display = "block";
    avatarInitial.textContent = (profile.name || "A").charAt(0).toUpperCase();
  }
}

function loadProfileTab() {
  const profile = getProviderProfile();
  document.getElementById("providerNameInput").value = profile.name || "";
  document.getElementById("providerSpecialtyInput").value = profile.specialty || "";
  document.getElementById("providerBioInput").value = profile.bio || "";

  const previewImg = document.getElementById("photoPreviewImg");
  const placeholder = document.getElementById("photoPlaceholder");
  if (profile.photo) {
    previewImg.src = profile.photo;
    previewImg.style.display = "block";
    placeholder.style.display = "none";
  }
}

let pendingPhoto = null;

document.getElementById("photoInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    pendingPhoto = event.target.result;
    document.getElementById("photoPreviewImg").src = pendingPhoto;
    document.getElementById("photoPreviewImg").style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
});

document.getElementById("saveProfileBtn2").addEventListener("click", () => {
  const existing = getProviderProfile();
  const profile = {
    name: document.getElementById("providerNameInput").value.trim() || existing.name,
    specialty: document.getElementById("providerSpecialtyInput").value.trim() || existing.specialty,
    bio: document.getElementById("providerBioInput").value.trim(),
    photo: pendingPhoto || existing.photo || null
  };
  localStorage.setItem("providerProfile", JSON.stringify(profile));
  applyProfileToHeader(profile);
  alert("Profile saved.");
});

const savedProfile = getProviderProfile();
applyProfileToHeader(savedProfile);
loadProfileTab();

// ---- Assessments ----
const assessClientSelect = document.getElementById("assessClientSelect");
clients.forEach(name => {
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  assessClientSelect.appendChild(opt);
});

const assessTemplates = {
  initial: {
    label: "Initial Assessment",
    fields: [
      { id: "complaint", label: "Chief Complaint", type: "textarea" },
      { id: "history", label: "History", type: "textarea" },
      { id: "observations", label: "Clinical Observations", type: "textarea" },
      { id: "plan", label: "Initial Plan", type: "textarea" }
    ]
  },
  pain: {
    label: "Pain Assessment",
    fields: [
      { id: "location", label: "Pain Location", type: "text" },
      { id: "scale", label: "Pain Scale (0-10)", type: "number" },
      { id: "aggravating", label: "Aggravating Factors", type: "text" },
      { id: "relieving", label: "Relieving Factors", type: "text" }
    ]
  },
  rom: {
    label: "Range of Motion (ROM)",
    fields: [
      { id: "joint", label: "Joint", type: "text" },
      { id: "movement", label: "Movement Tested", type: "text" },
      { id: "measured", label: "Measured (degrees)", type: "number" },
      { id: "normal", label: "Normal Range (degrees)", type: "text" }
    ]
  },
  mobility: {
    label: "Functional Mobility",
    fields: [
      { id: "level", label: "Mobility Level", type: "text" },
      { id: "device", label: "Assistive Device Used", type: "text" },
      { id: "distance", label: "Distance Walked", type: "text" },
      { id: "fallRisk", label: "Fall Risk Notes", type: "textarea" }
    ]
  }
};

const assessTypeSelect = document.getElementById("assessTypeSelect");
const assessFormFields = document.getElementById("assessFormFields");

function renderAssessForm() {
  const type = assessTypeSelect.value;
  const template = assessTemplates[type];

  assessFormFields.innerHTML = template.fields.map(f => `
    <label class="assess-label">${f.label}</label>
    ${f.type === "textarea"
      ? `<textarea id="af_${f.id}"></textarea>`
      : `<input type="${f.type}" id="af_${f.id}">`
    }
  `).join("");
}

assessTypeSelect.addEventListener("change", renderAssessForm);
renderAssessForm();

function getAssessments() {
  try {
    return JSON.parse(localStorage.getItem("providerAssessments")) || [];
  } catch {
    return [];
  }
}
function saveAssessments(list) {
  localStorage.setItem("providerAssessments", JSON.stringify(list));
}

function renderAssessments() {
  const list = getAssessments();
  const el = document.getElementById("assessList");

  if (list.length === 0) {
    el.innerHTML = `<p class="empty-state">No assessments saved yet.</p>`;
    return;
  }

  el.innerHTML = list.slice().reverse().map(a => `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-date">${a.date}</span>
        <span class="entry-pain">${a.client}</span>
      </div>
      <p class="entry-mood">${assessTemplates[a.type].label}</p>
      ${Object.entries(a.data).map(([k, v]) => v ? `<p class="entry-notes"><strong>${k}:</strong> ${v}</p>` : "").join("")}
    </div>
  `).join("");
}

document.getElementById("saveAssessBtn").addEventListener("click", () => {
  const type = assessTypeSelect.value;
  const template = assessTemplates[type];

  const data = {};
  template.fields.forEach(f => {
    const el = document.getElementById(`af_${f.id}`);
    data[f.label] = el.value.trim();
  });

  const hasContent = Object.values(data).some(v => v);
  if (!hasContent) {
    alert("Please fill in at least one field.");
    return;
  }

  const list = getAssessments();
  list.push({
    date: new Date().toLocaleString(),
    client: assessClientSelect.value,
    type,
    data
  });
  saveAssessments(list);

  template.fields.forEach(f => {
    document.getElementById(`af_${f.id}`).value = "";
  });

  renderAssessments();
});

renderAssessments();