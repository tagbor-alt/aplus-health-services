const services = [
  {
    name: "Physiotherapy",
    keywords: [
      "back pain", "lower back", "neck pain", "shoulder pain", "knee pain", "hip pain",
      "joint pain", "muscle pain", "muscle strain", "sprain", "injury", "sports injury",
      "mobility", "stiffness", "posture", "arthritis", "sciatica", "frozen shoulder",
      "tennis elbow", "post surgery", "balance", "gait", "walking difficulty", "swelling"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stro="currentColor" stroke="currentColor" stroke-width="2"><circle cx="12" cy="4" r="2"/><path d="M12 6v6l-4 8M12 12l4 8M8 10h8"/></svg>`
  },
  {
    name: "Occupational Therapy",
    keywords: [
      "daily activities", "disability", "stroke recovery", "home adaptation", "workplace adaptation",
      "fine motor", "self-care", "dressing", "feeding difficulty", "cerebral palsy",
      "developmental delay", "autism", "sensory issues", "hand function", "independence",
      "cognitive difficulty", "memory problems", "return to work"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 1 5 5c0 2-2 3-2 5v2H9v-2c0-2-2-3-2-5a5 5 0 0 1 5-5z"/><path d="M9 18h6M10 22h4"/></svg>`
  },
  {
    name: "Dietetics",
    keywords: [
      "weight loss", "weight gain", "obesity", "diabetes", "blood sugar", "diet plan",
      "nutrition", "hypertension", "high blood pressure", "cholesterol", "eating habits",
      "malnutrition", "food allergy", "digestive issues", "gut health", "meal planning",
      "underweight", "pregnancy nutrition"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6M8 6a4 4 0 0 0 8 0M6 10h12l-1 10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/></svg>`
  },
  {
    name: "Psychology",
    keywords: [
      "stress", "anxiety", "panic attacks", "depression", "low mood", "sadness",
      "mental health", "counselling", "grief", "trauma", "burnout", "sleep problems",
      "insomnia", "relationship issues", "anger", "overthinking", "confidence", "self esteem",
      "postpartum", "adhd", "ocd"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-1 2-1 3.5V14a3 3 0 0 1-6 0v-4.5C9 8 8 7.5 8 6a4 4 0 0 1 4-4z"/><path d="M9 18h6"/></svg>`
  },
  {
    name: "Respiratory Therapy",
    keywords: [
      "breathing difficulty", "shortness of breath", "asthma", "lungs", "chest tightness",
      "chronic cough", "copd", "wheezing", "bronchitis", "pneumonia recovery",
      "sleep apnea", "oxygen therapy", "lung rehabilitation", "smoking related"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V4M6 4a2 2 0 1 0 0 4M18 4a2 2 0 1 1 0 4M12 14v6"/></svg>`
  }
];

const grid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("searchInput");

function renderServices(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">No matching service found. Try the Symptom Checker instead.</p>`;
    return;
  }

  list.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="icon">${service.icon}</div><h3>${service.name}</h3>`;
    card.addEventListener("click", () => {
      window.location.href = `booking.html?service=${encodeURIComponent(service.name)}`;
    });
    grid.appendChild(card);
  });
}

renderServices(services);

function scoreService(service, queryWords) {
  let score = 0;
  const nameWords = service.name.toLowerCase().split(" ");

  queryWords.forEach(qWord => {
    if (qWord.length < 2) return;

    nameWords.forEach(nWord => {
      if (nWord.includes(qWord) || qWord.includes(nWord)) score += 2;
    });

    service.keywords.forEach(keyword => {
      const kWords = keyword.split(" ");
      if (keyword.includes(qWord)) score += 3;
      kWords.forEach(kWord => {
        if (kWord.startsWith(qWord) || qWord.startsWith(kWord)) score += 1;
      });
    });
  });

  return score;
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderServices(services);
      return;
    }

    const queryWords = query.split(/\s+/);

    const scored = services
      .map
    const services = [
  {
    name: "Physiotherapy",
    keywords: [
      "back pain", "lower back", "neck pain", "shoulder pain", "knee pain", "hip pain",
      "joint pain", "muscle pain", "muscle strain", "sprain", "injury", "sports injury",
      "mobility", "stiffness", "posture", "arthritis", "sciatica", "frozen shoulder",
      "tennis elbow", "post surgery", "balance", "gait", "walking difficulty", "swelling"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="4" r="2"/><path d="M12 6v6l-4 8M12 12l4 8M8 10h8"/></svg>`
  },
  {
    name: "Occupational Therapy",
    keywords: [
      "daily activities", "disability", "stroke recovery", "home adaptation", "workplace adaptation",
      "fine motor", "self-care", "dressing", "feeding difficulty", "cerebral palsy",
      "developmental delay", "autism", "sensory issues", "hand function", "independence",
      "cognitive difficulty", "memory problems", "return to work"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 1 5 5c0 2-2 3-2 5v2H9v-2c0-2-2-3-2-5a5 5 0 0 1 5-5z"/><path d="M9 18h6M10 22h4"/></svg>`
  },
  {
    name: "Dietetics",
    keywords: [
      "weight loss", "weight gain", "obesity", "diabetes", "blood sugar", "diet plan",
      "nutrition", "hypertension", "high blood pressure", "cholesterol", "eating habits",
      "malnutrition", "food allergy", "digestive issues", "gut health", "meal planning",
      "underweight", "pregnancy nutrition"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6M8 6a4 4 0 0 0 8 0M6 10h12l-1 10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/></svg>`
  },
  {
    name: "Psychology",
    keywords: [
      "stress", "anxiety", "panic attacks", "depression", "low mood", "sadness",
      "mental health", "counselling", "grief", "trauma", "burnout", "sleep problems",
      "insomnia", "relationship issues", "anger", "overthinking", "confidence", "self esteem",
      "postpartum", "adhd", "ocd"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-1 2-1 3.5V14a3 3 0 0 1-6 0v-4.5C9 8 8 7.5 8 6a4 4 0 0 1 4-4z"/><path d="M9 18h6"/></svg>`
  },
  {
    name: "Respiratory Therapy",
    keywords: [
      "breathing difficulty", "shortness of breath", "asthma", "lungs", "chest tightness",
      "chronic cough", "copd", "wheezing", "bronchitis", "pneumonia recovery",
      "sleep apnea", "oxygen therapy", "lung rehabilitation", "smoking related"
    ],
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V4M6 4a2 2 0 1 0 0 4M18 4a2 2 0 1 1 0 4M12 14v6"/></svg>`
  }
];

const grid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("searchInput");

function renderServices(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">No matching service found. Try the Symptom Checker instead.</p>`;
    return;
  }

  list.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="icon">${service.icon}</div><h3>${service.name}</h3>`;
    card.addEventListener("click", () => {
      window.location.href = `booking.html?service=${encodeURIComponent(service.name)}`;
    });
    grid.appendChild(card);
  });
}

renderServices(services);

function scoreService(service, queryWords) {
  let score = 0;
  const nameWords = service.name.toLowerCase().split(" ");

  queryWords.forEach(qWord => {
    if (qWord.length < 2) return;

    nameWords.forEach(nWord => {
      if (nWord.includes(qWord) || qWord.includes(nWord)) score += 2;
    });

    service.keywords.forEach(keyword => {
      const kWords = keyword.split(" ");
      if (keyword.includes(qWord)) score += 3;
      kWords.forEach(kWord => {
        if (kWord.startsWith(qWord) || qWord.startsWith(kWord)) score += 1;
      });
    });
  });

  return score;
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderServices(services);
      return;
    }

    const queryWords = query.split(/\s+/);

    const scored = services
      .map(s => ({ service: s, score: scoreService(s, queryWords) }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score);

    renderServices(scored.map(s => s.service));
  });
}
    