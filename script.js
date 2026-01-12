const ipaSymbols = document.querySelectorAll(".ipa-symbol");
const checkBtn = document.getElementById("check-btn");
const pronunciationBox = document.getElementById("pronunciation");

// Toggle active/inactive on click
ipaSymbols.forEach(symbol => {
  symbol.addEventListener("click", () => {
    symbol.classList.toggle("active");
  });
});

checkBtn.addEventListener("click", () => {
  const text = pronunciationBox.value;

  // Reset used states
  ipaSymbols.forEach(symbol => {
    symbol.classList.remove("used-active", "used-inactive");
  });

  ipaSymbols.forEach(symbol => {
    const ipaChar = symbol.dataset.symbol;

    if (text.includes(ipaChar)) {
      if (symbol.classList.contains("active")) {
        symbol.classList.add("used-active");
      } else {
        symbol.classList.add("used-inactive");
      }
    }
  });
});
