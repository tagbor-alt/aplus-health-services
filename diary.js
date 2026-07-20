const painRange = document.getElementById("painRange");
const painValue = document.getElementById("painValue");
painRange.addEventListener("input", () => {
  painValue.textContent = painRange.value;
});

let selectedMood = null;
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMood = btn.dataset.mood;
  });
});

function getEntries() {
  try {
    return JSON.parse(localStorage.getItem("healthDiaryEntries")) || [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem("healthDiaryEntries", JSON.stringify(entries));
}

function renderEntries() {
  const list = document.getElementById("entryList");
  const entries = getEntries();

  if (entries.length === 0) {
    list.innerHTML = `<p class="empty-state">No entries yet. Save your first one above.</p>`;
    return;
  }

  list.innerHTML = entries.slice().reverse().map(e => `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-date">${e.date}</span>
        <span class="entry-pain">Pain ${e.pain}/10</span>
      </div>
      <p class="entry-mood">Mood: ${e.mood || "Not set"}</p>
      ${e.exercise ? `<p class="entry-exercise">Exercise: ${e.exercise}</p>` : ""}
      ${e.notes ? `<p class="entry-notes">${e.notes}</p>` : ""}
    </div>
  `).join("");
}

document.getElementById("saveEntryBtn").addEventListener("click", () => {
  const entry = {
    date: new Date().toLocaleString(),
    pain: painRange.value,
    mood: selectedMood,
    exercise: document.getElementById("exerciseInput").value.trim(),
    notes: document.getElementById("notesInput").value.trim()
  };

  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);

  painRange.value = 0;
  painValue.textContent = "0";
  document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
  selectedMood = null;
  document.getElementById("exerciseInput").value = "";
  document.getElementById("notesInput").value = "";

  renderEntries();
});

renderEntries();