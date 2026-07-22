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

let currentUid = null;

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUid = user.uid;
  renderEntries();
});

function renderEntries() {
  const list = document.getElementById("entryList");
  db.collection("diaryEntries")
    .where("uid", "==", currentUid)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        list.innerHTML = `<p class="empty-state">No entries yet. Save your first one above.</p>`;
        return;
      }
      list.innerHTML = snapshot.docs.map(doc => {
        const e = doc.data();
        const date = e.createdAt ? e.createdAt.toDate().toLocaleString() : "Just now";
        return `
          <div class="entry-card">
            <div class="entry-top">
              <span class="entry-date">${date}</span>
              <span class="entry-pain">Pain ${e.pain}/10</span>
            </div>
            <p class="entry-mood">Mood: ${e.mood || "Not set"}</p>
            ${e.exercise ? `<p class="entry-exercise">Exercise: ${e.exercise}</p>` : ""}
            ${e.notes ? `<p class="entry-notes">${e.notes}</p>` : ""}
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      if (err.message.includes("index")) {
        alert("Firestore needs an index for this — check the error link in your browser console and click it to auto-create it.");
      }
    });
}

document.getElementById("saveEntryBtn").addEventListener("click", () => {
  if (!currentUid) return;

  const entry = {
    uid: currentUid,
    pain: painRange.value,
    mood: selectedMood,
    exercise: document.getElementById("exerciseInput").value.trim(),
    notes: document.getElementById("notesInput").value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("diaryEntries").add(entry).then(() => {
    painRange.value = 0;
    painValue.textContent = "0";
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    selectedMood = null;
    document.getElementById("exerciseInput").value = "";
    document.getElementById("notesInput").value = "";
    renderEntries();
  });
});