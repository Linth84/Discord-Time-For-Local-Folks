const dateInput = document.getElementById('date-input');
const formatSelect = document.getElementById('format');
const generateButton = document.getElementById('generate-button');
const resultParagraph = document.getElementById('result');
const copyButton = document.getElementById('copy-button');
const langButtons = document.querySelectorAll('.lang-button');

let language = 'es'; // Idioma predeterminado

const formatOptions = {
    es: [
        { value: 'f', text: 'Fecha completa (ej. 24 de diciembre de 2024 18:30)' },
        { value: 'F', text: 'Fecha larga (ej. Martes, 24 de diciembre de 2024 18:30)' },
        { value: 't', text: 'Hora corta (ej. 18:30)' },
        { value: 'T', text: 'Hora larga (ej. 18:30:45)' },
        { value: 'd', text: 'Solo fecha (ej. 24/12/2024)' },
    ],
    en: [
        { value: 'f', text: 'Full date (e.g. December 24, 2024 18:30)' },
        { value: 'F', text: 'Long date (e.g. Tuesday, December 24, 2024 18:30)' },
        { value: 't', text: 'Short time (e.g. 18:30)' },
        { value: 'T', text: 'Long time (e.g. 18:30:45)' },
        { value: 'd', text: 'Only date (e.g. 12/24/2024)' },
    ]
};

// Función para actualizar las opciones del selector de formato según el idioma
function updateFormatOptions() {
    formatSelect.innerHTML = ''; // Limpiar el selector de formato
    const options = formatOptions[language];

    options.forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.textContent = option.text;
        formatSelect.appendChild(newOption);
    });
}

// Llamar a la función para cargar las opciones de formato al inicio
updateFormatOptions();

// Configurar la fecha actual como valor predeterminado en el campo de entrada de fecha
const now = new Date();
const formattedDate = now.toISOString().slice(0, 16); // Formato "YYYY-MM-DDTHH:MM" para inputs de tipo datetime-local
dateInput.value = formattedDate;

generateButton.addEventListener('click', () => {
    let dateValue = new Date(formattedDate); // Establecer la fecha actual por defecto
    const userDate = dateInput.value;

    // Comprobar si el usuario ha ingresado una fecha y hora válidas
    if (userDate) {
        const userTime = userDate.slice(11); // Obtener solo la hora ingresada por el usuario
        const [hours, minutes] = userTime.split(':'); // Separar horas y minutos
        dateValue.setHours(hours);
        dateValue.setMinutes(minutes);
    }

    // Obtener el timestamp Unix en segundos
    const timestamp = Math.floor(dateValue.getTime() / 1000);
    const format = formatSelect.value;

    // Generar el timestamp de Discord con el formato seleccionado
    const discordTimestamp = `<t:${timestamp}:${format}>`;

    // Mostrar el resultado
    resultParagraph.textContent = language === 'es' 
        ? `Copie este timestamp: ${discordTimestamp}`
        : `Copy this timestamp: ${discordTimestamp}`;
    
    // Mostrar el botón de copiar
    copyButton.style.display = 'inline-block';
    copyButton.textContent = language === 'es' 
        ? 'Copiar al Portapapeles' 
        : 'Copy to Clipboard';

    // Acción para copiar al portapapeles
    copyButton.onclick = () => {
        navigator.clipboard.writeText(discordTimestamp).then(() => {
            alert(language === 'es' 
                ? 'Copiado al portapapeles!' 
                : 'Copied to clipboard!');
        });
    };
});

// Cambiar el idioma y actualizar las opciones de formato al hacer clic en los botones de idioma
langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        language = e.target.id;
        updateFormatOptions(); // Actualizar las opciones de formato en el idioma seleccionado
    });
});
