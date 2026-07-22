const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const chatWindow = document.getElementById("chatWindow");

const AI_ENDPOINT = "https://braintagbor--4e57cde4848a11f1bf291607ee4eb77e.web.val.run";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.innerHTML = `<p>${text}</p>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getAIResponse(message) {
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply || "Sorry, I couldn't process that right now.";
  } catch (err) {
    return "Sorry, something went wrong connecting to the AI. Please try again.";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("Thinking...", "ai");
  const thinkingMsg = chatWindow.lastElementChild;

  const reply = await getAIResponse(text);
  thinkingMsg.remove();
  addMessage(reply, "ai");
});