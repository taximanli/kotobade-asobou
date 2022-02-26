import { getStoredDisplayLanguage } from '../lib/localStorage'

export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!
export const GAME_HEADING = ['Kotobade Asobou', '言葉で遊ぼう']
export const GAME_LINK = process.env.REACT_APP_GAME_LINK!

interface TranslationType {
  [index: string]: string
}

export let en = {} as TranslationType

en['For keyboard input'] = 'Type kana here'
en['Settings'] = 'Settings'
en['Hint Mode'] = 'Hint Mode'
en['Hard Mode'] = 'Hard Mode'
en['Revealed hints'] = 'Revealed hints'
en['and'] = 'and'
en['must be used in subsequent guesses'] = 'must be used in subsequent guesses.'
en['Dark Mode'] = 'Dark Mode'
en['High Contrast Mode'] = 'High Contrast Mode'
en['Feedback'] = 'Feedback'
en['This game is the'] = 'Kotobade Asobou is the'
en['Japanese version'] = 'Japanese version'
en['word guessing game'] = 'of the word guessing game we all know and love. This game was forked from this'
en['open source version'] = 'open source version'
en['massive development'] = 'and has undergone massive redevelopment with extra game mode and new elements added to accommodate the unique features of the Japanese language.'
en['If you enjoy'] = 'If you enjoy the game and would like to support my work, please consider'
en['buying me a coffee'] = 'buying me a coffee'
en['if you wish'] = '♥️'
en['Buy me a coffee?'] = 'Buy me a coffee? ♥️ https://ko-fi.com/taximanli'
en['GAME_COPIED_MESSAGE'] = 'Copied results to clipboard'
en['NOT_ENOUGH_LETTERS_MESSAGE'] = 'Not enough letters'
en['WORD_NOT_FOUND_MESSAGE'] = 'Not in word list'
en['HINT_MODE_ALERT_MESSAGE'] = 'Hint Mode can only be turned off at the start'
en['HARD_MODE_ALERT_MESSAGE'] = 'Hard Mode can only be turned on at the start'
en['STATISTICS_TITLE'] = 'Statistics'
en['GUESS_DISTRIBUTION_TEXT'] = 'Guess Distribution'
en['NEW_WORD_TEXT'] = 'Next word in'
en['SHARE_TEXT'] = 'Share'
en['TOTAL_TRIES_TEXT'] = 'Games Played'
en['SUCCESS_RATE_TEXT'] = 'Success Rate'
en['CURRENT_STREAK_TEXT'] = 'Current Streak'
en['BEST_STREAK_TEXT'] = 'Best Streak'

export let ja = {} as TranslationType

ja['For keyboard input'] = 'キーボード入力用'
ja['Settings'] = '設定'
ja['Hint Mode'] = 'ヒントモード'
ja['Hard Mode'] = 'ハードモード'
ja['Revealed hints'] = '開示されたヒント'
ja['and'] = 'と'
ja['must be used in subsequent guesses'] = 'を満たす単語だけが入力できます。'
ja['Dark Mode'] = 'ダークモード'
ja['High Contrast Mode'] = 'ハイコントラストモード'
ja['Feedback'] = 'フィードバック'
ja['This game is the'] = '「言葉で遊ぼう」は、よく知られていて大好きな単語パズルゲームの'
ja['Japanese version'] = '日本語版'
ja['word guessing game'] = 'です。このゲームは、この'
ja['open source version'] = 'オープンソース版'
ja['massive development'] = 'からフォークして大規模なソフトウェア再開発を経ています。また、日本語の特徴を満たすために、新しいモードと要素が追加されています。'
ja['If you enjoy'] = 'このゲームを楽しんで、私のソフトウェア開発をサポートしたい場合は、望めば ♥️'
ja['buying me a coffee'] = '私にコーヒーを一杯おごる'
ja['if you wish'] = 'こともできます。'
ja['Buy me a coffee?'] = '私にコーヒーを一杯？♥️ https://ko-fi.com/taximanli'
ja['GAME_COPIED_MESSAGE'] = '成績をクリップボードにコピーしました'
ja['NOT_ENOUGH_LETTERS_MESSAGE'] = '4文字入力してください'
ja['WORD_NOT_FOUND_MESSAGE'] = 'この答えは単語リストにありません'
ja['HINT_MODE_ALERT_MESSAGE'] = 'ヒントモードは、ゲーム開始時にのみオフにすることができます'
ja['HARD_MODE_ALERT_MESSAGE'] = 'ハードモードは、ゲーム開始時にのみオンにすることができます'
ja['STATISTICS_TITLE'] = '統計情報'
ja['GUESS_DISTRIBUTION_TEXT'] = '推測数の分布'
ja['NEW_WORD_TEXT'] = '次の単語まで'
ja['SHARE_TEXT'] = 'シェア'
ja['TOTAL_TRIES_TEXT'] = 'プレイ回数'
ja['SUCCESS_RATE_TEXT'] = '勝率'
ja['CURRENT_STREAK_TEXT'] = '現在の連勝数'
ja['BEST_STREAK_TEXT'] = '最大連勝数'

export const t = (index: string) => {
  const displayLanguage = getStoredDisplayLanguage()
  return (displayLanguage === 'ja' ? ja[index] : en[index])
}

// export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const WIN_MESSAGES = {
  en: [
    'Genius!',
    'Genius!',
    'Magnificent!',
    'Magnificent!',
    'Impressive!',
    'Impressive!',
    'Splendid!',
    'Splendid!',
    'Great!',
    'Great!',
    'Phew!',
    'Phew!',
  ],
  ja: [
    '天才！',
    '天才！',
    '素晴らしい！',
    '素晴らしい！',
    '立派！',
    '立派！',
    '素敵！',
    '素敵！',
    'すごい！',
    'すごい！',
    'セーフ！',
    'セーフ！',
  ]
}

export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}. 今日の正解は「${solution}」です。`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}. ${position}文字目は「${guess}」でないといけません。`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}.「${letter}」を答えに含める必要があります。`

export const ENTER_TEXT = '⏎'
export const DELETE_TEXT = '⇦'

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