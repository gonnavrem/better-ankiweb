document.getElementById("font-select").addEventListener("change", (event) => {
    const selectedFont = event.target.value;
  
    // Enviar un mensaje al contenido de la página activa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeFontFamily",
        fontFamily: selectedFont,
      });
    });
  });
  