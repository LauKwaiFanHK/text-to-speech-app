const voiceSelector = document.querySelector("#select-voice");

const inputForm = document.querySelector("input-form");

const populateVoices = (voices) => {
    voices.forEach((voice) => {
        const voiceOption = document.createElement('option');

        voiceOption.textContent = `${voice.name} (${voice.lang})`;

        voiceSelector.appendChild(voiceOption);
    })
};

const getVoices = () => {
    const myVoices = new Promise((resolve, reject) => {
        const speechService = window.speechSynthesis;
        
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

getVoices();

inputForm.onsubmit = (event) => {
    event.preventDefault();
(input)
    const textInput = inputForm.value;
    if (textInput !== '') {
        const utterance = new SpeechSynthesisUtterance(textInput);

        utterance.onerror = (event) => {
            alert("Oops! Something went wrong!");
        }
    }
    
}