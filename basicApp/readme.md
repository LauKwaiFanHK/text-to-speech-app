# text-to-speech app

## index.html
- contains HTML code for the layout and style for the app
- charset attribute: UTF-8
    - recommended in HTML5
    - covers almost all of the characters and symbols
- viewport: area of the window in which web content can be seen
    - `device-width`: 100vw (i.e. 100% of the viewport width)
    - `initial-scale`: used default `1`

## main.js
- contains JavaScript code to 
    - render text area input field, dropdown menu and voice options, a Submit text button
    - handle clicking Submit text button
    - handle changing voice option
    - use [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) to utter the submitted text.

## Features
- User can enter text, click on Submit text button to start uttering the text.
- User can change the voice option.
- When text is entered, changing voice option automatically re-utters the text.
