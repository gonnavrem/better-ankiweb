document.addEventListener("DOMContentLoaded", () => {
  const fontSelect = document.getElementById("font-select");
  const savedFontFamily = localStorage.getItem("fontFamily");

  if (savedFontFamily) {
      fontSelect.value = savedFontFamily;
  }

  fontSelect.addEventListener("change", (event) => {
      const selectedFont = event.target.value;

      // Enviar un mensaje al contenido de la página activa
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
              action: "changeFontFamily",
              fontFamily: selectedFont,
          });
      });

      localStorage.setItem("fontFamily", selectedFont);
  });
});