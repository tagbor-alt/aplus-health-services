const articles = [
  {
    category: "Ergonomics",
    title: "Fixing your desk posture",
    readTime: "3 min read",
    body: "Sit with your feet flat on the floor, hips slightly above knee level, and your screen at eye height so you're not tilting your neck down. Keep elbows close to your body at roughly a 90-degree angle. Stand and move every 30 to 45 minutes — even a short walk resets the strain that builds up in the lower back and shoulders from long sitting."
  },
  {
    category: "Falls",
    title: "Fall-proofing the home for older adults",
    readTime: "4 min read",
    body: "Most falls happen during ordinary daily movement, not dramatic accidents — a loose rug, a dim hallway, wet bathroom tiles. Remove trailing wires and loose mats, add grab bars near the toilet and shower, and keep a light source within reach of the bed. Well-fitted, closed-back footwear matters more than people expect; loose slippers are a common contributor to slips."
  },
  {
    category: "Child Development",
    title: "What to expect: milestones by age 2",
    readTime: "3 min read",
    body: "By 24 months, most children can walk steadily, run, kick a ball, and climb stairs holding a rail. Language typically includes short two-word phrases and following simple two-step instructions. Every child develops at their own pace, but if several milestones are noticeably delayed together, it's worth mentioning to a pediatrician or occupational therapist."
  },
  {
    category: "Nutrition",
    title: "Small changes that actually stick",
    readTime: "2 min read",
    body: "Rather than overhauling your whole diet at once, pick one meal to adjust — swap a sugary drink for water, or add a vegetable to lunch. Consistency over weeks beats intensity over days. If you're managing a chronic condition like diabetes or hypertension, a dietitian can tailor this to your specific numbers rather than general advice."
  },
  {
    category: "Mental Health",
    title: "Naming stress before it builds up",
    readTime: "3 min read",
    body: "Stress often shows up physically before we consciously notice it — tight shoulders, shallow breathing, trouble sleeping. A simple daily check-in, even just naming how you feel in one word, can catch this early. Persistent low mood or anxiety that affects daily functioning is worth discussing with a psychologist rather than managing alone."
  },
  {
    category: "Ergonomics",
    title: "Lifting safely at work or home",
    readTime: "2 min read",
    body: "Bend at the knees and hips, not the waist, keeping the load close to your body as you lift. Avoid twisting while carrying something heavy — turn your whole body with your feet instead. If a task involves repeated heavy lifting, a physiotherapy assessment can help you build the right technique and strength before an injury happens."
  }
];

const listEl = document.getElementById("articleList");
let activeFilter = "all";

function render() {
  const filtered = activeFilter === "all"
    ? articles
    : articles.filter(a => a.category === activeFilter);

  listEl.innerHTML = filtered.map((a, i) => `
    <div class="article-card" data-index="${i}">
      <span class="article-tag">${a.category}</span>
      <h3>${a.title}</h3>
      <p class="article-meta">${a.readTime}</p>
      <p class="article-body" style="display:none;">${a.body}</p>
    </div>
  `).join("");

  document.querySelectorAll(".article-card").forEach(card => {
    card.addEventListener("click", () => {
      const body = card.querySelector(".article-body");
      body.style.display = body.style.display === "none" ? "block" : "none";
    });
  });
}

document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    render();
  });
});

render();