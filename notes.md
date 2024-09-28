# TODO

- I really don't need so many cards, come up with a plan where I can have the "by category" and only one for the other that acomodates to my Spanish Class. I may alos leave duolingo's in place, who knows

* Eventually, I need to separate each language into its on array. This will allow me to include more languages without having to load them both in the same object, which will get quite BIG!
* The array containing the terms should be called _words_ or _terms_ not _set_. Change this so in the future i can differentiate between an array that is an array of terms and an array of sets.
* I need to create a building process that will change all the env variables like `const ROUTE_HOME` at compile time and copy it to the corresponding shrood app dir

  ### Structure

  The data structure should be as follows:

  - Each language must be contained in its own array.
  - The word's type should be of `{uniqueId: word}`, where the uniqueId for the word is the same across all languages, serving as an indexer and a relationship key.
  - The words set type should be similar to what it is right now and keeping its own word categorization.

  # IDEAS

  - Turn this into an rpg where users defeat monsters as they progress? ....hhmm 🤔
  - make an app for my wife where she can rectify them all

# LEFT OFF

- left of in [category]/layout, I am trying to render the subcategories for "words-by-category"
