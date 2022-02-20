export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!
export const GAME_HEADING = ['Kotobade Asobou', '言葉で遊ぼう']
export const GAME_LINK = process.env.REACT_APP_GAME_LINK!

// export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const WIN_MESSAGES = [
  'Genius! 天才！',
  'Genius! 天才！',
  'Magnificent! 素晴らしい！',
  'Magnificent! 素晴らしい！',
  'Impressive! 立派！',
  'Impressive! 立派！',
  'Splendid! 素敵！',
  'Splendid! 素敵！',
  'Great! すごい！',
  'Great! すごい！',
  // 'Phew! セーフ！',
  // 'Phew! セーフ！',
]

export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}. 今日の正解は「${solution}」です。`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}. ${position}文字目は「${guess}」でないといけません。`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}.「${letter}」を答えに含める必要があります。`
export const ENTER_TEXT = '⏎'
export const DELETE_TEXT = '⇦'

export const ALLOWED_KANA = 'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをんゔー'

export const CLOSE_STATUS_KANA = [
  'あぁ',
  'いぃ',
  'うゔぅ',
  'えぇ',
  'おぉ',
  'やゃ',
  'ゆゅ',
  'よょ',
  'かが',
  'きぎ',
  'くぐ',
  'けげ',
  'こご',
  'さざ',
  'しじ',
  'すず',
  'せぜ',
  'そぞ',
  'ただ',
  'ちぢ',
  'つづっ',
  'てで',
  'とど',
  'はばぱ',
  'ひびぴ',
  'ふぶぷ',
  'へべぺ',
  'ほぼぽ',
]

export const CONSONANT_STATUS_KANA = [
  'あいうえおぁぃぅぇぉ',
  'かきくけこ',
  'さしすせそ',
  'たちつてとっ',
  'なにぬねの',
  'はひふへほ',
  'まみむめも',
  'やゆよゃゅょ',
  'らりるれろ',
  'わを',
  'がぎぐげご',
  'ざじずぜぞ',
  'だぢづでど',
  'ばびぶべぼ',
  'ぱぴぷぺぽ',    
]

export const VOWEL_STATUS_KANA = [
  'ぁあかさたなはまやらわがざだばぱゃ',
  'ぃいきしちにひみりぎじぢびぴ',
  'ぅうくすつぬふむゆるゔぐずづっぶぷゅ',
  'ぇえけせてねへめれげぜでべぺ',
  'ぉおこそとのほもよろをごぞどぼぽょ',  
]