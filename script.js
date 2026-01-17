/* =====================================================
   IPA SYMBOL STATE MANAGEMENT
===================================================== */

/*
  Each IPA symbol element must have:
    class="ipa-symbol"
    data-symbol="ɲ"
*/

const ipaSymbols = document.querySelectorAll(".ipa-symbol");
const checkButton = document.getElementById("checkBtn");
const pronunciationBox = document.getElementById("pronunciation");

/* =====================================================
   CLICK TO ACTIVATE / DEACTIVATE
===================================================== */

ipaSymbols.forEach(symbol => {
  symbol.addEventListener("click", () => {
    symbol.classList.toggle("active");
  });
});

/* =====================================================
   PRONUNCIATION CHECK LOGIC
===================================================== */

checkButton.addEventListener("click", () => {
  const transcription = pronunciationBox.value;

  // Clear previous usage states
  ipaSymbols.forEach(symbol => {
    symbol.classList.remove("used-active", "used-inactive");
  });

  // Check each IPA symbol against the transcription
  ipaSymbols.forEach(symbol => {
    const ipaChar = symbol.dataset.symbol;

    if (!ipaChar) return;

    if (transcription.includes(ipaChar)) {
      if (symbol.classList.contains("active")) {
        symbol.classList.add("used-active");
      } else {
        symbol.classList.add("used-inactive");
      }
    }
  });
});

/* =====================================================
   OPTIONAL UTILITIES (FUTURE USE)
===================================================== */

/*
  Normalize IPA input (not enabled yet)

  This is where you could:
  - Strip spaces
  - Normalize combining diacritics
  - Convert affricates (t͡ʃ) to base symbols
*/
function normalizeIPA(text) {
  return text.normalize("NFC");
}

/*
  Future: extract multi-character phonemes

  Example targets:
    t͡ʃ
    d͡ʒ
    k͡x
*/
function extractPhonemes(text) {
  return [...text];
}




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
