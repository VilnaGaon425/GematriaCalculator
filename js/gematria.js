export const HEBREW_VALUES = {
  "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ש": 300, "ר": 200,
  "ק": 100, "ל": 30, "מ": 40, "נ": 50, "ס": 60, "ע": 70, "פ": 80,
  "צ": 90, "ת": 400, "ך": 20, "ם": 600, "ן": 50, "ץ": 90, "ת": 400,
  "י": 10, "כ": 20, "ח": 8, "ז": 7, "ט": 9, "א": 1, "ב": 2,
  "ג": 3, "ד": 4, "ה": 5, "ש": 300, "ר": 200, "ק": 100,
};

export function normalizeHebrew(text = "") {
  return String(text)
    .replace(/\s+/g, " ")
    .replace(/[\uFB2A-\uFB4E]/g, "")
    .trim();
}

export function calculateGematria(text = "", useKatan = false) {
  const cleaned = normalizeHebrew(text);
  if (!cleaned) return 0;

  let sum = 0;
  for (const char of cleaned) {
    const value = HEBREW_VALUES[char];
    if (typeof value === "number") sum += value;
  }

  if (!useKatan) return sum;

  let katan = sum;
  while (katan >= 10) {
    katan = String(katan)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }
  return katan;
}
