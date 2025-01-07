function addToggleIconsToAllSections() {
    const cards = document.querySelectorAll("#qa");

    const globalVisibilityState = JSON.parse(localStorage.getItem("globalVisibilityState")) || {};

    cards.forEach((card) => {
        const childNodes = Array.from(card.childNodes);

        childNodes.forEach((node) => {
            // Ignore empty text nodes and style elements
            if (
                (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) ||
                (node.nodeType === Node.ELEMENT_NODE &&
                    (node.tagName === "STYLE" || node.tagName === "HR"))
            ) {
                return;
            }

            if (node.dataset && node.dataset.processed) return;


            if (node.nodeType === Node.TEXT_NODE) {
                const span = document.createElement("span");
                span.textContent = node.textContent.trim();
                span.dataset.processed = true;
                node.replaceWith(span);
                node = span;
            }

            // Create a text container span if it doesn't exist so the eye icon can be added
            let textContainer = node.querySelector(".text-container");
            if (!textContainer) {
                textContainer = document.createElement("span");
                textContainer.classList.add("text-container");
                textContainer.innerHTML = node.innerHTML;
                node.innerHTML = "";
                node.appendChild(textContainer);
            }

            const sectionClass = node.classList.length > 0 ? [...node.classList].join(" ") : "default-section";

            if (globalVisibilityState[sectionClass]) {
                textContainer.style.visibility = "hidden";
            }

            if (node.querySelector(".toggle-icon")) return; 

            // Create the eye icon
            const icon = document.createElement("span");
            icon.classList.add("toggle-icon");
            icon.style.cursor = "pointer";
            icon.style.marginLeft = "10px";
            icon.style.fontSize = "20px";
            icon.style.pointerEvents = "auto";
            icon.innerHTML = textContainer.style.visibility === "hidden" ? "🙈" : "👁️";

            // Visibility toggle
            icon.addEventListener("click", (event) => {
                event.stopPropagation(); 

                if (textContainer.style.visibility === "hidden") {
                    textContainer.style.visibility = "visible";
                    icon.innerHTML = "👁️";

                    globalVisibilityState[sectionClass] = false;
                } else {
                    textContainer.style.visibility = "hidden";
                    icon.innerHTML = "🙈";

                    globalVisibilityState[sectionClass] = true;
                }

                localStorage.setItem("globalVisibilityState", JSON.stringify(globalVisibilityState));
            });


            if (!node.style.position || node.style.position === "static") {
                node.style.position = "relative";
            }

            node.appendChild(icon);
            node.dataset.processed = true;
        });
    });
}

// The observer only detects changes in the buttons (ansarea)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === "ansarea") {
            addToggleIconsToAllSections();
        }
    });
});

addToggleIconsToAllSections();

observer.observe(document.body, { childList: true, subtree: true });
