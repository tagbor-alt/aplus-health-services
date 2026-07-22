auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent = user.email;

  db.collection("users").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      document.getElementById("userName").textContent = doc.data().name || "My Profile";
    }
  });

  db.collection("healthProfiles").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("ageInput").value = data.age || "";
      document.getElementById("goalsInput").value = data.goals || "";
      document.getElementById("conditionsInput").value = data.conditions || "";
      document.getElementById("ecNameInput").value = data.ecName || "";
      document.getElementById("ecPhoneInput").value = data.ecPhone || "";
    }
  });

  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const profile = {
      age: document.getElementById("ageInput").value,
      goals: document.getElementById("goalsInput").value.trim(),
      conditions: document.getElementById("conditionsInput").value.trim(),
      ecName: document.getElementById("ecNameInput").value.trim(),
      ecPhone: document.getElementById("ecPhoneInput").value.trim()
    };
    db.collection("healthProfiles").doc(user.uid).set(profile).then(() => {
      const note = document.getElementById("saveNote");
      note.style.display = "block";
      setTimeout(() => { note.style.display = "none"; }, 2000);
    });
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut().then(() => window.location.href = "index.html");
  });

  // ---- Dependents ----
  function renderDependents() {
    db.collection("users").doc(user.uid).collection("dependents").get().then(snapshot => {
      const list = document.getElementById("dependentList");
      if (snapshot.empty) {
        list.innerHTML = `<p class="empty-state">No dependents added yet.</p>`;
        return;
      }
      list.innerHTML = snapshot.docs.map(doc => {
        const d = doc.data();
        return `
          <div class="entry-card">
            <div class="entry-top">
              <span class="entry-date">${d.name}</span>
              <span class="entry-pain">${d.relation || ""}</span>
            </div>
            <p class="entry-mood">Age: ${d.age || "N/A"}</p>
            ${d.conditions ? `<p class="entry-notes">${d.conditions}</p>` : ""}
            <button class="remove-dep-btn" data-id="${doc.id}">Remove</button>
          </div>
        `;
      }).join("");

      document.querySelectorAll(".remove-dep-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          db.collection("users").doc(user.uid).collection("dependents").doc(btn.dataset.id).delete()
            .then(renderDependents);
        });
      });
    });
  }

  document.getElementById("addDependentBtn").addEventListener("click", () => {
    const name = document.getElementById("depName").value.trim();
    const age = document.getElementById("depAge").value.trim();
    const relation = document.getElementById("depRelation").value.trim();
    const conditions = document.getElementById("depConditions").value.trim();

    if (!name) {
      alert("Please enter a name.");
      return;
    }

    db.collection("users").doc(user.uid).collection("dependents").add({
      name, age, relation, conditions,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      document.getElementById("depName").value = "";
      document.getElementById("depAge").value = "";
      document.getElementById("depRelation").value = "";
      document.getElementById("depConditions").value = "";
      renderDependents();
    });
  });

  renderDependents();
});

// ---- Theme picker ----
document.querySelectorAll(".theme-swatch").forEach(sw => {
  if (sw.dataset.theme === (localStorage.getItem("appTheme") || "navy")) {
    sw.classList.add("active");
  }
  sw.addEventListener("click", () => {
    document.querySelectorAll(".theme-swatch").forEach(s => s.classList.remove("active"));
    sw.classList.add("active");
    localStorage.setItem("appTheme", sw.dataset.theme);
    applyTheme(sw.dataset.theme);
  });
});

// ---- Language picker ----
document.querySelectorAll(".lang-opt").forEach(btn => {
  if (btn.dataset.lang === (localStorage.getItem("appLang") || "en")) {
    btn.classList.add("active");
  }
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-opt").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    localStorage.setItem("appLang", btn.dataset.lang);
    applyLanguage(btn.dataset.lang);
  });
});