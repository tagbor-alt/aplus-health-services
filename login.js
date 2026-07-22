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

document.getElementById("authForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const name = document.getElementById("nameInput").value.trim();

  authError.style.display = "none";
  authSubmit.disabled = true;

  if (mode === "signup") {
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
          name: name,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        window.location.href = "home.html";
      })
      .catch(err => {
        authError.textContent = err.message;
        authError.style.display = "block";
        authSubmit.disabled = false;
      });
  } else {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch(err => {
        authError.textContent = err.message;
        authError.style.display = "block";
        authSubmit.disabled = false;
      });
  }
});