const answers = { q1: null, q2: null, q3: null };

const serviceMap = {
  pain: "Physiotherapy",
  breathing: "Respiratory Therapy",
  mood: "Psychology",
  diet: "Dietetics",
  daily: "Occupational Therapy"
};

const serviceLabels = {
  Physiotherapy: "physiotherapist",
  "Respiratory Therapy": "respiratory therapist",
  Psychology: "psychologist",
  Dietetics: "dietitian",
  "Occupational Therapy": "occupational therapist"
};

function showStep(id) {
  document.querySelectorAll(".sym-step").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll("#q1Options .sym-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    answers.q1 = btn.dataset.val;
    showStep("step2");
  });
});

document.querySelectorAll("#q2Options .sym-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    answers.q2 = btn.dataset.val;
    showStep("step3");
  });
});

document.querySelectorAll("#q3Options .sym-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    answers.q3 = btn.dataset.val;
    showResult();
  });
});

function showResult() {
  const service = serviceMap[answers.q1];
  const label = serviceLabels[service];
  const resultCard = document.getElementById("resultCard");

  let urgencyNote = "";
  if (answers.q3 === "severe" || (answers.q1 === "breathing" && answers.q3 !== "mild")) {
    urgencyNote = `<p class="sym-urgent">If this is sudden, severe, or getting worse quickly, please seek immediate medical care rather than waiting for an appointment.</p>`;
  }

  resultCard.innerHTML = `
    <h3>We'd suggest: ${service}</h3>
    <p>Based on your answers, a ${label} is best placed to help with this.</p>
    ${urgencyNote}
    <a href="booking.html?service=${encodeURIComponent(service)}" class="btn-primary full-width" style="margin-top:16px; display:block; text-align:center;">Book with a ${label}</a>
  `;

  showStep("resultStep");
}

document.getElementById("restartBtn").addEventListener("click", () => {
  answers.q1 = null; answers.q2 = null; answers.q3 = null;
  showStep("step1");
});