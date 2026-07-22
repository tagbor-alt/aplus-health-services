const themes = {
  navy:   { primary: "#131B3A", bg: "#EEF1F6", muted: "#4A5170", faint: "#9AA1BD" },
  forest: { primary: "#1F5C4F", bg: "#F0F4F1", muted: "#3D5A50", faint: "#9AB5AC" },
  coral:  { primary: "#A13D2F", bg: "#F7F0ED", muted: "#7A5048", faint: "#C9A79E" },
  plum:   { primary: "#4B2E58", bg: "#F3EEF5", muted: "#6B5473", faint: "#B9A6C2" }
};

function applyTheme(name) {
  const t = themes[name] || themes.navy;
  const root = document.documentElement;
  root.style.setProperty("--primary", t.primary);
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--muted", t.muted);
  root.style.setProperty("--faint", t.faint);
}

const savedTheme = localStorage.getItem("appTheme") || "navy";
applyTheme(savedTheme);