const dateInput = document.getElementById('date-input');
const formatSelect = document.getElementById('format');
const generateButton = document.getElementById('generate-button');
const resultParagraph = document.getElementById('result');
const title = document.getElementById('title');
const dateLabel = document.getElementById('date-label');
const formatLabel = document.getElementById('format-label');
const langButtons = document.querySelectorAll('.lang-button');
const footer = document.getElementById('footer');

let language = 'es'; // Idioma predeterminado

// Función para generar el timestamp de Discord
generateButton.addEventListener('click', () => {
    const dateValue = new Date(dateInput.value);

    if (!dateValue.getTime()) {
        resultParagraph.textContent = language === 'es' ? 'Por favor, introduce una fecha válida.' : 'Please enter a valid date.';
        return;
    }

    // Obtener timestamp Unix en segundos
    const timestamp = Math.floor(dateValue.getTime() / 1000);
    const format = formatSelect.value;

    // Generar el timestamp de Discord con el formato seleccionado
    const discordTimestamp = `<t:${timestamp}:${format}>`;

    resultParagraph.textContent = language === 'es' 
        ? `Copie este timestamp: ${discordTimestamp}`
        : `Copy this timestamp: ${discordTimestamp}`;
});

// Función para cambiar el idioma
langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        language = e.target.id;

        if (language === 'es') {
            title.textContent = 'Tiempos de Discord para locales';
            dateLabel.textContent = 'Introduce la fecha y hora local:';
            formatLabel.textContent = 'Elige el formato de Discord:';
            generateButton.textContent = 'Generar timestamp';
            footer.textContent = 'Desarrollado por Edgardo Villalba';
        } else if (language === 'en') {
            title.textContent = 'Discord Times for Local Folks';
            dateLabel.textContent = 'Enter your local date and time:';
            formatLabel.textContent = 'Choose Discord format:';
            generateButton.textContent = 'Generate timestamp';
            footer.textContent = 'Developed by Edgardo Villalba';
        }
    });
});
