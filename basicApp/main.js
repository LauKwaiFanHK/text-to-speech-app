// Get a reference to the SpeechSynthesis controller.
const speechService = window.speechSynthesis;

// Access DOM elements.
const voiceSelector = document.querySelector('#select-voice');
const inputForm = document.querySelector('form');
const inputText = document.querySelector('#text-area');
const submitButton = document.querySelector('#submit-text-button')

// Initiate a variable for voices.
let myVoices;

// Populate a select menu with voice options so that users can choose a voice.
const populateVoices = (voices) => {
    myVoices = voices;
    voices.forEach((voice) => {
        const voiceOption = document.createElement('option');

        const voiceLabel = `${voice.name} (${voice.lang})`;

        voiceOption.textContent = voiceLabel;

        if (voice.default) {
            voiceOption.textContent = `${voiceLabel} - default`;
        };

        voiceOption.setAttribute("data-lang", voice.lang);
        voiceOption.setAttribute("data-name", voice.name);

        voiceSelector.appendChild(voiceOption);
    });
};

// Retrieve a list of available voices.
const loadVoices = () => {
    myVoices = new Promise((resolve, reject) => {
        /**  
         * When a page is loaded, it takes time to populate the voices array as it is done asynchronously.
         * Fetch voices 0.01 second after initial render to prevent empty voices array.
        */
        setTimeout(() => {
            const voices = speechService.getVoices();
            if (voices.length > 0) {
                resolve(voices);
            }
        }, 10);
    });

    myVoices.then((voices) => {
        populateVoices(voices);
    });
};

loadVoices();

const createSpeech = () => {
    // Stop handling clicking on submit button when it is speaking.
    if (speechService.speaking) return;

    const text = inputText.value;
    if (text !== '') {
        // Create a new SPeechSynthesisUtterance instance containing input text.
        const utterance = new SpeechSynthesisUtterance(text);

        // Inform user when error is thrown.
        utterance.onerror = (error) => {
            alert("Oops! Something went wrong!");
            console.error(error);
        }

        // Set the utterance's voice to the voice selected from the select menu. 
        const selectedVoiceName = voiceSelector.selectedOptions[0].getAttribute("data-name");
        const selectedVoice = myVoices?.find((voice) => voice.name === selectedVoiceName);
        utterance.voice = selectedVoice;

        // Set default pitch and speech speed.
        utterance.pitch = 1;
        utterance.rate = 1;

        // Start speaking.
        speechService.speak(utterance);
    } else {
        alert("Please enter text.");
    }
};

inputForm.onsubmit = (e) => {
    // Stop the form submitting.
    e.preventDefault();
    createSpeech();
};

voiceSelector.onchange = (createSpeech);