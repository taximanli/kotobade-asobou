# React Wordle

This is a clone project of the popular word guessing game we all know and love. Made using React, Typescript, and Tailwind.

[**Try out the demo!**](https://reactle.vercel.app/)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
$> npm install
$> npm run start
```

### To build/run docker container:

```bash
$> docker build -t game .
$> docker run -d -p 3000:3000 game
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Projects built using this repo

### Other languages

- [Latindictionary.io](https://wordle.latindictionary.io/): Latin
- [Kelmaly](https://kelmaly.com/): Arabic
- [Arwordle](https://arwordle.netlify.app/): Arabic
- [Wörtchen](https://woertchen.sofacoach.de): German
- [Vārdulis](wordle.lielakeda.lv/): Latvian
- [꼬들 - 한국어](https://belorin.github.io/): Korean
- [한글 풀어쓰기 5자](https://nakosung.github.io/wordle/): Korean
- [Urdle](https://urdle.chaoticity.com/): Urdu
- [சொல்லாடல் Soladle](https://omtamil.com/soladle): Tamil
- [Szózat](https://szozat.miklosdanka.com/): Hungarian
- [Pashtoodle](https://pashtoodle.lingdocs.com): Pashto
- [Malay](https://malay-wordle.netlify.app/): Bahasa Malaysia

### Fun themes

- [Murdle](https://murdle.vercel.app/): Spooky hangman mashup
- [Taylordle](https://www.taylordle.com/): Taylor Swift
- [Dundle](https://dundle.dunmiffcord.com/): The Office
- [Weedel](https://meetmeinouter.space/wordle/): Video game characters
- [JoJodle](https://jojo-news.com/fun/jojodle/): JoJo’s Bizarre Adventure
- [Airportle](https://airportle.scottscheapflights.com/): Airport Codes
- [Mahjong Handle](https://mahjong-handle.update.sh/): Mahjong Hands
- ['en si lì'ur](https://tirea.learnnavi.org/wordle): Na'vi, the constructed language from James Cameron's AVATAR (2009)
- [Wordle.cl](wordle.cl): Chilean modisms, cities, places
- [Anidal](https://anidal-abrarhayat.web.app/): Animals

### Math, Acronyms, Science, Tech, and more

- [Primel](https://converged.yt/primel/): Prime numbers
- [Syscordle](https://nezza.github.io/syscordle/): SYSCALL
- [Mathler](https://www.mathler.com/): Find the solution that equals X
- [Stockle](https://stockle.win/): Guess the stock or ETF
- [AI-powered](https://github.com/asirota/wordle-ai): Includes an AI component
- [Passwordle](https://passwordle.sp8c3.com/): Passwords
- [Genel](https://andrewholding.github.io/gene-wordle/): Gene symbols
- [Numble](https://rbrignall.github.io/numble/): Maths

_Want to add one to the list? Just make a pull request or [let us know via a comment here](https://github.com/cwackerfuss/react-wordle/issues/120)_

## FAQ

### How can I change the length of a guess?

- Update the `MAX_WORD_LENGTH` variable in [src/constants/settings.ts](src/constants/settings.ts) to the desired length.
- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to only include words of the new length.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) arrays to only include words of the new length.

### How can I create a version in another language?

- In [public/index.html](public/index.html):
  - Update the title, the description, and the "You need to enable JavaScript" message
  - Update the language attribute in the HTML tag
  - If the language is written right-to-left, add `dir="rtl"` to the HTML tag
- Update the name and short name in [public/manifest.json](public/manifest.json)
- Update the strings in [src/constants/strings.ts](src/constants/strings.ts)
- Add all of the five letter words in the language to [src/constants/validGuesses.ts](src/constants/validGuesses.ts), replacing the English words
- Add a list of goal words in the language to [src/constants/wordlist.ts](src/constants/wordlist.ts), replacing the English words
- Update the "About" modal in [src/components/modals/AboutModel.tsx](src/components/modals/AboutModel.tsx)
- Update the "Info" modal in [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx)
- If the language has letters that are not present in English update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language's letters are made of multiple unicode characters, use a grapheme splitter at various points throughout the app or normalize the input so that all of the letters are made of a single character
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in [src/lib/share.ts](src/lib/share.ts)
