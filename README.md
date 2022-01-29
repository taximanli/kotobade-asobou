# Wordle Clone

- Go play the real Wordle [here](https://www.powerlanguage.co.uk/wordle/)
- Read the story behind it [here](https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html)
- Try a demo of this clone project [here](https://wordle.hannahmariepark.com)

_Inspiration:_
This game is an open source clone of the immensely popular online word guessing game Wordle. Like many others all over the world, I saw the signature pattern of green, yellow, and white squares popping up all over social media and the web and had to check it out. After a few days of play, I decided it would be great for my learning to try to rebuild Wordle in React!

_Design Decisions:_
I used a combination of React, Typescript, and Tailwind to build this Wordle Clone. When examining the original Wordle, I assumed the list might come from an external API or database, but after investigating in chrome dev tools I found that the list of words is simply stored in an array on the front end. I'm using the same list as the OG Wordle uses, but watch out for spoilers if you go find the file in this repo! The word match functionality is simple: the word array index increments each day from a fixed game epoch timestamp (only one puzzle per day!) roughly like so:

```
WORDS[Math.floor((NOW_IN_MS - GAME_EPOCH_IN_MS) / ONE_DAY_IN_MS)]
```

React enabled me to componentize the littlest parts of the game - keys and letter cells - and use them as the building blocks for the keyboard, word grid, and winning solution graphic. As for handling state, I used the built in useState and useEffect hooks to track guesses, whether the game is won, and to conditionally render popups.

In addition to other things, Typescript helped ensure type safety for the statuses of each guessed letter, which were used in many areas of the app and needed to be accurate for the game to work correctly.

I implemented Tailwind mostly because I wanted to learn how to use Tailwind CSS, but I also took advantage of [Tailwind UI](https://tailwindui.com/) with their [headless package](https://headlessui.dev/) to build the modals and notifications. This was such an easy way to build simple popups for how to play, winning the game, and invalid words.

_To Run Locally:_
Clone the repository and perform the following command line actions:
```bash
$ cd wordle
$ npm install
$ npm run start
```

_To build/run docker container:_
```bash
$ docker build -t notwordle .
$ docker run -d -p 3000:3000 notwordle
```
open http://localhost:3000 in browser.

_To create a version in a different language:_

- Update the title, the description, and the "You need to enable JavaScript" message in `public/index.html`
- Update the language attribute in the HTML tag in `public/index.html`
- Update the name and short name in `public/manifest.json`
- Update the strings in `src/constants/strings.ts`
- Add all of the five letter words in the language to `src/constants/validGuesses.ts`, replacing the English words
- Add a list of goal words in the language to `src/constants/wordlist.ts`, replacing the English words
- Update the "About" modal in `src/components/modals/AboutModel.tsx`
- Update the "Info" modal in `src/components/modals/InfoModal.tsx`
- If the language has letters that are not present in English, add them to the `CharValue` type in `src/lib/statuses.ts` and update the keyboard in `src/lib/components/keyboard/Keyboard.tsx`
- If the language's letters are made of multiple unicode characters, use a grapheme splitter at various points throughout the app or normalize the input so that all of the letters are made of a single character
- If the language is written right-to-left, add `dir="rtl"` to the HTML tag in `public/index.html` and prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in `src/lib/share.ts`
