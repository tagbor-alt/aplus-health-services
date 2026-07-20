const translations = {
  en: {
    tagline: "Connecting you to the right care, anytime.",
    heroTitle: "Care that finds you.",
    heroSub: "Physiotherapy, occupational therapy, dietetics, psychology and respiratory therapy — matched to you, in one place.",
    findCare: "Find your care",
    imProvider: "I'm a provider →",
    howItWorks: "HOW IT WORKS",
    step1Title: "Tell us what's going on",
    step1Body: "A quick check points you toward the right kind of professional.",
    step2Title: "Get matched",
    step2Body: "See qualified physiotherapists, OTs, dietitians, psychologists and respiratory therapists near you.",
    step3Title: "Book and connect",
    step3Body: "Choose online, in-person, or a home visit — then message your provider directly.",
    careAreas: "CARE AREAS",
    physio: "Physiotherapy",
    ot: "Occupational Therapy",
    diet: "Dietetics",
    psych: "Psychology",
    resp: "Respiratory Therapy",
    ctaTitle: "Feeling better starts with one step.",
    getStarted: "Get started",
    searchPlaceholder: "Search for a service or condition...",
    symptomBanner: "Not sure what you need? Take the Symptom Checker",
    chooseService: "Choose a Service",
    navHome: "Home",
    navDiary: "Diary",
    navLearn: "Learn",
    navAI: "AI Hub",
    navProfile: "Profile"
  },
  tw: {
    tagline: "Ɛde wo kɔ ayaresa a ɛfata wo, bere biara.",
    heroTitle: "Ayaresa a ɛhwehwɛ wo.",
    heroSub: "Physiotherapy, Occupational Therapy, aduan ho afotu, adwene mu akwahosan, ne home mu yare ayaresa — wɔ baabiara koro.",
    findCare: "Hwehwɛ w'ayaresa",
    imProvider: "Meyɛ ɔyaresafo →",
    howItWorks: "SƐDE ƐYƐ ADWUMA",
    step1Title: "Ka nea ɛha wo kyerɛ yɛn",
    step1Body: "Nsɛmmisa kakraa bi bɛkyerɛ wo ɔyaresafo a ɔfata.",
    step2Title: "Hwehwɛ wo ɔyaresafo",
    step2Body: "Hwɛ physiotherapists, OTs, aduan ho afotufo, adwene mu ayaresafo ne home mu ayaresafo a wɔbɛn wo.",
    step3Title: "Yɛ w'appointment na di nkitahodi",
    step3Body: "Paw online, ɔyaresafo hɔ, anaa fie nsrahwɛ — na fa nkra kɔma wo ɔyaresafo tee.",
    careAreas: "AYARESA AHODOƆ",
    physio: "Physiotherapy",
    ot: "Occupational Therapy",
    diet: "Aduan Ho Afotu",
    psych: "Adwene Mu Akwahosan",
    resp: "Home Mu Yare Ayaresa",
    ctaTitle: "W'ahosan pa fi anammɔn baako ase.",
    getStarted: "Fi ase",
    searchPlaceholder: "Hwehwɛ ɔsom bi anaa yare bi...",
    symptomBanner: "Wonnim nea wohia? Sɔ Symptom Checker no hwɛ",
    chooseService: "Paw Ɔsom Bi",
    navHome: "Fie",
    navDiary: "Diary",
    navLearn: "Sua",
    navAI: "AI Hub",
    navProfile: "Profile"
  },
  ga: {
    tagline: "Kɛ bo kɛ tsɔɔmɔ kpakpa lɛ, be fɛɛ.",
    heroTitle: "Tsɔɔmɔ ni naa bo.",
    heroSub: "Physiotherapy, Occupational Therapy, niyenii he ŋaawoo, jwɛŋmɔ he hewalɛ, kɛ home mu helɛ tsɔɔmɔ — fɛɛ yɛ he kome.",
    findCare: "Naa o-tsɔɔmɔ",
    imProvider: "Mi ji tsɔɔlɔ →",
    howItWorks: "BƆ NI EFEƆ NƆ",
    step1Title: "Kɛɛ wɔ nɔ ni yeɔ bo naa",
    step1Body: "Sanebimɔi kuku ko baaye ebua bo kɛya tsɔɔlɔ ni sa.",
    step2Title: "Na o-tsɔɔlɔ",
    step2Body: "Kwɛ physiotherapists, OTs, niyenii he ŋaawolɔi, jwɛŋmɔ he hewalɛ tsɔɔlɔi kɛ home mu tsɔɔlɔi ni bɛŋkɛ bo.",
    step3Title: "Fee appointment ni okɛ tsɔɔlɔ lɛ akpɛ",
    step3Body: "Hala online, he ko, aloo shia mli sarayeli — ni okɛ tsɔɔlɔ lɛ awie tsuo.",
    careAreas: "TSƆƆMƆ HEMƆI",
    physio: "Physiotherapy",
    ot: "Occupational Therapy",
    diet: "Niyenii He Ŋaawoo",
    psych: "Jwɛŋmɔ He Hewalɛ",
    resp: "Home Mu Helɛ Tsɔɔmɔ",
    ctaTitle: "Bo hewalɛ kpakpa jeɔ shi kɛ gbɛfaŋ kome.",
    getStarted: "Je shishi",
    searchPlaceholder: "Taomɔ sɔmɔ ko loo hela ko...",
    symptomBanner: "Onaaa nɔ ni ohe? Ka Symptom Checker lɛ he",
    chooseService: "Hala Sɔmɔ Ko",
    navHome: "Shia",
    navDiary: "Diary",
    navLearn: "Kase",
    navAI: "AI Hub",
    navProfile: "Profile"
  }
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
}

const savedLang = localStorage.getItem("appLang") || "en";
document.addEventListener("DOMContentLoaded", () => applyLanguage(savedLang));