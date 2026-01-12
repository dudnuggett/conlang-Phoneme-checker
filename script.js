const pronunciationBox = document.getElementById("pronunciation");
const checkBtn = document.getElementById("check-btn");

let ipaSymbols = [];

function initIPASymbols() {
  document.querySelectorAll(".ipa-table td, .ipa-chart p").forEach(cell => {
    const chars = cell.textContent.trim().split(/\s+/);

    cell.textContent = "";

    chars.forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("ipa-symbol", "inactive");
      span.dataset.symbol = char;

      span.addEventListener("click", () => {
        span.classList.toggle("active");
        span.classList.toggle("inactive");
      });

      cell.appendChild(span);
      cell.append(" ");

      ipaSymbols.push(span);
    });
  });
}

function checkPronunciation() {
  const text = pronunciationBox.value.normalize("NFD");

  ipaSymbols.forEach(symbol => {
    symbol.classList.remove("used-active", "used-inactive");

    const ipa = symbol.dataset.symbol.normalize("NFD");

    if (text.includes(ipa)) {
      if (symbol.classList.contains("active")) {
        symbol.classList.add("used-active");
      } else {
        symbol.classList.add("used-inactive");
      }
    }
  });
}

checkBtn.addEventListener("click", checkPronunciation);
document.addEventListener("DOMContentLoaded", initIPASymbols);
