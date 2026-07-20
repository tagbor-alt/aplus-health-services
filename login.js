let mode = "login";

const nameField = document.getElementById("nameField");
const authSubmit = document.getElementById("authSubmit");
const authError = document.getElementById("authError");

document.querySelectorAll(".toggle-option").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.dataset.mode;

    if (mode === "signup") {
      nameField.style.display = "block";
      authSubmit.textContent = "Create Account";
    } else {
      nameField.style.display = "none";
      authSubmit.textContent = "Log In";
    }
    authError.style.display = "none";
  });
});

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("appUsers")) || [];
  } catch (err) {
    alert("Storage error: " + err.message);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem("appUsers", JSON.stringify(users));
  } catch (err) {
    alert("Could not save: " + err.message);
  }
}

document.getElementById("authForm").addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value;
    const name = document.getElementById("nameInput").value.trim();
    const users = getUsers();

    authError.style.display = "none";

    if (mode === "signup") {
      if (users.find(u => u.email === email)) {
        authError.textContent = "An account with this email already exists.";
        authError.style.display = "block";
        return;
      }
      users.push({ name, email, password });
      saveUsers(users);
      localStorage.setItem("currentUser", JSON.stringify({ name, email }));
      window.location.href = "home.html";
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        authError.textContent = "Incorrect email or password.";
        authError.style.display = "block";
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
      window.location.href = "home.html";
    }
  } catch (err) {
    alert("Something went wrong: " + err.message);
  }
});