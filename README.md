# Flash Cards

## About

Allows users to upload a set of flashcards via a csv or json file of a max of 5MB. The cards are saved to local storage. Since I use this for other flashcards with hard coded sets, the set first looks for a global variable called `flashCardsSets.` Only after failing to find this variable, the loading function looks for values in the local storage.

## Dev

Run: `npm run start` to run in dev
Run: `npm run build` to build for production. Load the dist folder wherever the app is wished to render.
