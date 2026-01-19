
const ipaSymbols = document.querySelectorAll(".ipa-symbol");
const checkBtn = document.getElementById("checkBtn");
const pronunciation = document.getElementById("pronunciation");

ipaSymbols.forEach(sym => {
sym.addEventListener("click", () => {
sym.classList.toggle("active");
});
});

checkBtn.addEventListener("click", () => {
const text = pronunciation.value;

ipaSymbols.forEach(sym => {
sym.classList.remove("used-active", "used-inactive");
const char = sym.dataset.symbol;

if (text.includes(char)) {
if (sym.classList.contains("active")) {
sym.classList.add("used-active");
} else {
sym.classList.add("used-inactive");
}
}
});
});

  




/* =========================
   CORE HELPERS
========================= */

// Return space-separated data-symbol values
function getSelectedSymbols() {
  return Array.from(document.querySelectorAll('.ipa-symbol.active'))
    .map(el => el.dataset.symbol)
    .join(' ');
}

// Apply selections from space-separated code
function selectSymbolsFromCode(code) {
  // Clear existing selections
  document.querySelectorAll('.ipa-symbol.active')
    .forEach(el => el.classList.remove('active'));

  if (!code) return;

  code.trim().split(/\s+/).forEach(sym => {
    const el = document.querySelector(
      `.ipa-symbol[data-symbol="${CSS.escape(sym)}"]`
    );
    if (el) {
      el.classList.add('active');
    }
  });
}

/* =========================
   FILE EXPORT
========================= */

document.getElementById('exportBtn').addEventListener('click', () => {
  const code = getSelectedSymbols();
  if (!code) return;

  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'ipa-symbols.txt';
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  a.remove();
});

/* =========================
   FILE IMPORT
========================= */

document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    selectSymbolsFromCode(e.target.result);
  };
  reader.readAsText(file, 'UTF-8');

  this.value = ''; // allow re-importing same file
});

/* =========================
   TEXT EXPORT
========================= */

document.getElementById('getBtn').addEventListener('click', () => {
  document.getElementById('symbolsText').value = getSelectedSymbols();
});

/* =========================
   TEXT IMPORT
========================= */

document.getElementById('goBtn').addEventListener('click', () => {
  const code = document.getElementById('symbolsInput').value;
  selectSymbolsFromCode(code);
});
