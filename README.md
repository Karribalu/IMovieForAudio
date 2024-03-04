# IMovie for Audio

This application is supposed to be a clone of IMovie in Mac OS but for Audio built using React JS.

## Deployed to github pages

- https://www.balasubramanyam.xyz/imovie-for-audio/

## Libraries Used

- wavesurfer.js (https://wavesurfer.xyz/)
  - Used to visualize audio waveforms.
- hello-pangea/dnd (https://github.com/hello-pangea/dnd)
  - Used for drag and drop functionality.
- styled-components (https://styled-components.com/)

## Detailing my approach

To create the clone of IMovie for Audio, I took the following use cases.

1. Import Audios: Users can import audio files from their device.

2. Add Audios to Timeline: Users can easily add imported audio files to the timeline for arranging and playback.

3. Audio Controls:

   - Pause: Users can pause playback of the audio at any point.
   - Play: Users can start playback of the audio.
   - Complete Timeline: Users can play through the entire timeline of audio clips seamlessly.
   - Draggable Time Line: A draggable playhead allows users to move seamlessly within the timeline to any desired point.
   - Draggable Waveform: Each audio waveform should be movable inside the timeline.
   - Move to Next Audio: Users can navigate to the next audio clip in the timeline.
   - Move to Previous Audio: Users can navigate to the previous audio clip in the timeline.

## Design decisions

1. I divided components to three broad categories.
   - Upload Component
   - Tmeline Component
   - Audio Container inside the Upload Component.
2. Implemented Draggable inside the Upload Component as well, If user wants to organize the imports before adding to the timeline.
3. Not implemented drag and drop from Upload component to Timeline (Genuinely tried it for some good time 😕 ).
4. Added checkboxes for each Audio File and a button to add the selected to Timeline at the end.
5. Double click on the timeline moves the playback head to that position.

## Challenges I encountered

It took some good time to understand the user behaviour and action which can be performable in browser.

1. Had to make a POC for Drag and Drop feature for a day to make myself comfortable.
2. Implementing the playback line in the timeline took a lot of effort as it needs to capture the current playback time and current audio being played and also should be draggable.

## How to Run in local

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
