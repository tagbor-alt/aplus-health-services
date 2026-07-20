const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("userName").textContent = currentUser.name || "My Profile";
document.getElementById("userEmail").textContent = currentUser.email;

function getProfileKey() {
  return `healthProfile_${currentUser.email}`;
}

function loadProfile() {
  try {
    const data = JSON.parse(localStorage.getItem(getProfileKey())) || {};
    document.getElementById("ageInput").value = data.age || "";
    document.getElementById("goalsInput").value = data.goals || "";
    document.getElementById("conditionsInput").value = data.conditions || "";
    document.getElementById("ecNameInput").value = data.ecName || "";
    document.getElementById("ecPhoneInput").value = data.ecPhone || "";
  } catch {}
}

document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const profile = {
    age: document.getElementById("ageInput").value,
    goals: document.getElementById("goalsInput").value.trim(),
    conditions: document.getElementById("conditionsInput").value.trim(),
    ecName: document.getElementById("ecNameInput").value.trim(),
    ecPhone: document.getElementById("ecPhoneInput").value.trim()
  };
  localStorage.setItem(getProfileKey(), JSON.stringify(profile));

  const note = document.getElementById("saveNote");
  note.style.display = "block";
  setTimeout(() => { note.style.display = "none"; }, 2000);
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

loadProfile();