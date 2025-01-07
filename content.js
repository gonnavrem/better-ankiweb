// Función para agregar íconos de "mostrar/ocultar" a todos los nodos visibles
function addToggleIconsToAllSections() {
    // Selecciona el contenedor principal de la carta
    const cards = document.querySelectorAll("#qa");

    if (cards.length === 0) {
        console.log("No se encontraron cartas con el ID #qa.");
        return;
    }

    cards.forEach((card) => {
        // Selecciona todos los nodos hijos del contenedor (texto y elementos)
        const childNodes = Array.from(card.childNodes);

        childNodes.forEach((node) => {
            // Ignorar nodos no visuales (e.g., espacios en blanco, scripts, estilos)
            if (
                (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) || // Nodos de texto vacíos
                (node.nodeType === Node.ELEMENT_NODE &&
                    (node.tagName === "STYLE" || node.tagName === "HR")) // Ignorar estilos y separadores
            ) {
                return;
            }

            // Verifica si ya tiene un ícono para evitar duplicados
            if (node.dataset && node.dataset.processed) return;

            // Manejo de nodos de texto
            if (node.nodeType === Node.TEXT_NODE) {
                const span = document.createElement("span");
                span.textContent = node.textContent.trim();
                span.dataset.processed = true; // Marca como procesado
                node.replaceWith(span); // Reemplaza el nodo de texto con un contenedor
                node = span; // Actualiza la referencia al nuevo nodo
            }

            // Crea el ícono
            const icon = document.createElement("span");
            icon.classList.add("toggle-icon");
            icon.style.cursor = "pointer";
            icon.style.marginLeft = "10px";
            icon.style.fontSize = "16px";
            icon.innerHTML = "👁️"; // Ícono de "ojo"

            // Añade un evento de clic para mostrar/ocultar
            icon.addEventListener("click", () => {
                if (node.style.visibility === "hidden") {
                    node.style.visibility = "visible";
                    icon.innerHTML = "👁️"; // Cambia al ícono de "mostrar"
                } else {
                    node.style.visibility = "hidden";
                    icon.innerHTML = "🙈"; // Cambia al ícono de "ocultar"
                }
            });

            // Inserta el ícono después del contenido de la sección
            node.appendChild(icon);
        });
    });
}

// Configura un observador para detectar cambios en el DOM
const observer = new MutationObserver(() => {
    addToggleIconsToAllSections();
});

// Inicia el observador en el cuerpo de la página
observer.observe(document.body, { childList: true, subtree: true });

// Ejecuta la función una vez al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    addToggleIconsToAllSections();
    console.log("Script cargado y ejecutado.");
});
