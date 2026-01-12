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
