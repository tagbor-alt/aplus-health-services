const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const chatWindow = document.getElementById("chatWindow");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.innerHTML = `<p>${text}</p>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getResponse(text) {
  const t = text.toLowerCase();

  if (t.includes("back") || t.includes("posture") || t.includes("sitting")) {
    return "Try gentle stretching and posture correction every hour. If the pain persists beyond a few days or affects your daily activities, consider booking a physiotherapy assessment.";
  }
  if (t.includes("breath") || t.includes("lung") || t.includes("chest")) {
    return "Slow diaphragmatic breathing can help in the moment. If breathing difficulty is ongoing or severe, a respiratory therapy consultation is a good next step — and seek urgent care if it's sudden or severe.";
  }
  if (t.includes("stress") || t.includes("anxious") || t.includes("mood") || t.includes("sad")) {
    return "It helps to name what's weighing on you and take a few slow breaths. If this has been going on for a while, speaking with one of our psychology providers could help.";
  }
  if (t.includes("diet") || t.includes("weight") || t.includes("food") || t.includes("eating")) {
    return "Small, consistent changes tend to work best. For a plan tailored to your goals or a condition, our dietetics team can help.";
  }
  if (t.includes("injury") || t.includes("daily activities") || t.includes("home")) {
    return "Sounds like this might affect how you manage daily tasks. An occupational therapist can help you adapt your routine or environment.";
  }
  return "Thanks for sharing that. I'd recommend booking a quick assessment so a professional can look into it properly — want me to take you to the service list?";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    addMessage(getResponse(text), "ai");
  }, 500);
});