
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







// Helper: convert IPA syllable to CV representation
function syllableToCV(syllableChars) {
  // Simple heuristic: vowels = IPA vowel chars
   const vowels = [
    'i','y','ɨ','ʉ','ɯ','u','ɪ','ʏ','ʊ','e','ø','ɘ','ɵ','ɤ','o','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','a','ɶ','ɑ','ɒ',
    'aɪ','aʊ','eɪ','oʊ','ɔɪ','ɪə','eə','ʊə'
      ];
  return syllableChars.map(c => vowels.includes(c.toLowerCase()) ? 'V' : 'C').join('');
}

// Main function to color the allowed structures
function checkSyllableStructureVisual(ipaText, allowedStructures, inputDiv) {
  const cleanText = ipaText.replace(/[ˈˌ]/g, ''); // remove stress marks
  const syllables = cleanText.split('.');

  const syllCVs = syllables.map(syl => syllableToCV(Array.from(syl)));

  const usedStructures = allowedStructures.filter(struct => 
    syllCVs.includes(struct.toUpperCase())
  );

  // Clear existing content
  inputDiv.innerHTML = '';

  allowedStructures.forEach(struct => {
    const span = document.createElement('span');
    span.textContent = struct.trim() + ' ';
    if (usedStructures.includes(struct.toUpperCase())) {
      span.style.color = 'green';
      span.style.fontWeight = 'bold';
    } else {
      span.style.color = 'red';
    }
    inputDiv.appendChild(span);
  });

  return usedStructures;
}

// Hook into check button
checkBtn.addEventListener("click", () => {
  const text = pronunciation.value;
  const syllInputDiv = document.getElementById('syllableInput');

  // Get allowed structures from div content (split by spaces/commas)
  const allowedStructures = syllInputDiv.textContent
    .split(/[\s,]+/)
    .map(s => s.trim())
    .filter(Boolean);

  // Highlight IPA symbols as before
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

  // Color the syllable structures
  checkSyllableStructureVisual(text, allowedStructures, syllInputDiv);
});


