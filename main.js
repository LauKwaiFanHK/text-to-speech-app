const speechService = window.speechSynthesis;

const voiceSelector = document.querySelector('#select-voice');
const inputForm = document.querySelector('form');
const inputText = document.querySelector('#text-area');
const submitButton = document.querySelector('#submit-text-button')

let myVoices;

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

const getVoices = () => {
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
        console.log(voices.json());
    });
};

getVoices();

const createSpeech = () => {
    const text = inputText.value;
    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);

        // Inform user when error is thrown.
        utterance.onerror = (error) => {
            alert("Oops! Something went wrong!");
            console.error(error);
        }

        const selectedVoiceName = voiceSelector[0].getAttribute("data-name");

        const selectedVoice = myVoices?.find((voice) => voice.name === selectedVoiceName);
        
        utterance.voice = selectedVoice;
        utterance.pitch = 1;
        utterance.rate = 1;

        speechService.speak(utterance);
    }
};

inputForm.onsubmit = (e) => {
    e.preventDefault();
    createSpeech();
};
  