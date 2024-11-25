import { getStoredDisplayLanguage } from '../lib/localStorage'
import { PREFERRED_DISPLAY_LANGUAGE, MAX_WORD_LENGTH } from '../constants/settings'

export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!
export const GAME_LINK = process.env.REACT_APP_GAME_LINK!

export const KOFI_LINK = 'https://ko-fi.com/taximanli'
export const JISHO_SEARCH_LINK = 'https://jisho.org/search/'

export const ENTER_TEXT = '⏎'
export const DELETE_TEXT = '⇦'

export const TOP_SUPPORTER_NAME = `briantist, Jeffrey Friedl, RC, Pugnator, カリさ, Rose, TamagoGP, 長谷川, Tim, hostvarious, Keika, Alexey, mudeng, Y, Sanetomo Ninetails, Toshi, kmaebashi, Yoshiyasu, m, 平尾, Kylar, 東郷, keychera, 純友良幸, みのる, cheapshot, リアム ...`
export const SUPPORTER_NAME = `kwmt, krsw, Adonkomann, kssk, こみてん, jdb, Iruka, Ruth, msiyss, Tatsu, shinsuke234, Shinome, rui, yusukes, bleuleu, mame, たろー, ShinH, RXHAP(るざっぷ), nunomihiro, yoko, Hikaru, マスミ, Tyler, Konini, Mineo, Terra Powers, iwasaki, asagi, soka, Jen Chapman, かほ, 二瀬双葉, nakajio, namoken, JapaneseJuku, Schimmee, aomam, えだまめ, おとみ, fumipong, マチュ, Noya, くまぽろ, NEO, negi, 布帽子, ファット, BIRIYANI, MIDORI, エスナカモト, Someone, Niji, moo, Kana, Binkie, YUKIKO, Merja, erino, な, み遊, ９ちゃん。, ennairda aya, atsushi1972, Seth, Meri, kuroneko, Chi, uj, Shimmee, keiichi, Yumi, Mitchan P, Tonya, mitrac, febm, Vicky M, 安井彰一, pan, fumaruri, 玉木雅治, haharesan, maman (masa yan), 14番, afrowagen, バンクスおんらいん, hayafunakei, touko, Chris, ほしなみ, Dewbs, karamite, Kou684, Michael, めと, kado, Mt4vE, koblf, bree, zk, Cheryl, ユーキャン, Akitack, あかいと, tosuke, xipj, のん, あるる, Rima, Katie Fraser, neko, kana, Vikki, Kai M, Ken1 ...`

interface TranslationType {
  [index: string]: string
}

export const t = (index: string, text1: string = '', text2: string = '') => {
  const displayLanguage = getStoredDisplayLanguage()
  let translationText = (displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? ja[index] : en[index])
  if (text1 !== '') translationText = translationText.replace('$text1', text1)
  if (text2 !== '') translationText = translationText.replace('$text2', text2)
  return translationText
}

export let en = {} as TranslationType

en['KOFI_LINK'] = KOFI_LINK
en['For keyboard input'] = 'Type かな here'

en['Settings'] = 'Settings'
en['Language'] = 'Language 言語'
en['Switch to language'] = '日本語'
en['Timezone'] = 'Set timezone'
en['Layout'] = 'Layout'
en['LAYOUT_DESCRIPTION'] = 'Select the positions of text box and kana chart.'
en['Hint Mode'] = 'Hint Mode'
en['HINT_MODE_DESCRIPTION'] = 'Show three extra types of hints (circle, up and down arrows, left and right arrows).'
en['Hard Mode'] = 'Hard Mode'
en['HARD_MODE_DESCRIPTION'] = 'Revealed hints（$text1 and $text2）must be used in subsequent guesses.'
en['Dark Mode'] = 'Dark Mode'
en['High Contrast Mode'] = 'High Contrast Mode'
en['HIGH_CONTRAST_MODE_DESCRIPTION'] = 'For improved color vision'
en['Feedback'] = 'Feedback'

en['This game is the'] = 'Kotobade Asobou is the'
en['Japanese version'] = 'Japanese version'
en['word guessing game'] = 'of the word guessing game we all know and love. This game was forked from this'
en['open source version'] = 'open source version'
en['massive development'] = 'and has undergone massive redevelopment with extra game mode and new elements added to accommodate the unique features of the Japanese language.'

en['own passion project'] = 'Kotobade Asobou went from my own passion project for learning Japanese, to becoming a popular game enjoyed by players from both inside and outside of Japan. Honestly, I\'m overwhelmed!'
en['If you enjoy'] = 'If you enjoy the game and would like to support my work, please consider'
en['buying me a coffee'] = 'Buying Me a Coffee'
en['if you wish'] = '♥️'
en['Buy me a coffee?'] = 'Buy me a coffee? ♥️ ' + KOFI_LINK
en['do my best'] = 'I\'ll do my best to keep improving the game!'
en['much love to'] = 'Much love to my supporters ♥️'

en['If you love this game'] = 'Love the game and want to support me?'
en['Please consider'] = 'Please consider'
en['can you treat me'] = 'Buying Me a Coffee'
en['please?'] = '♥️'

en['GAME_COPIED_MESSAGE'] = 'Copied results to clipboard'
en['NOT_ENOUGH_LETTERS_MESSAGE'] = '$text1 is not a ' + MAX_WORD_LENGTH + '-kana word'
en['WORD_NOT_FOUND_MESSAGE'] = 'Not in word list'
en['TIMEZONE_ALERT_MESSAGE'] = 'Timezone can only be switched at the start of the game'
en['HINT_MODE_ALERT_MESSAGE'] = 'Hint Mode can only be turned off at the start of the game'
en['HARD_MODE_ALERT_MESSAGE'] = 'Hard Mode can only be turned on at the start of the game'
en['PAST_CORRECT_WORD_MESSAGE'] = 'The word for game #$text1 was '
en['CORRECT_WORD_MESSAGE'] = 'The word for this game was '
en['WRONG_SPOT_MESSAGE'] = 'Must use $text1 in position $text2.'
en['NOT_CONTAINED_MESSAGE'] = 'Guess must contain $text1.'

en['SUPPORT_TITLE'] = 'Support'
en['STATISTICS_TITLE'] = 'Statistics'
en['GUESS_DISTRIBUTION_TEXT'] = 'Guess distribution'
en['NEW_WORD_TEXT'] = 'Next word in'
en['SHARE_TEXT'] = 'Share'
en['LINE_TEXT'] = 'Line'
en['THREADS_TEXT'] = 'Threads'
en['BLUESKY_TEXT'] = 'Bluesky'
en['TWEET_TEXT'] = 'Tweet'
en['TOTAL_TRIES_TEXT'] = 'Games Played'
en['SUCCESS_RATE_TEXT'] = 'Success Rate'
en['CURRENT_STREAK_TEXT'] = 'Current Streak'
en['BEST_STREAK_TEXT'] = 'Best Streak'

en['MIGRATE_DESCRIPTION_TEXT'] = 'Click here to transfer your game statistics to a new device.'
en['MIGRATE_BUTTON_TEXT'] = 'Transfer'
en['Transfer your statistics'] = 'Transfer your statistics'
en['Copy the migration code'] = 'Copy the migration code on your old device and paste into the input on the new device.'
en['This is my'] = 'This is my'
en['old device'] = 'old device'
en['new device'] = 'new device'
en['Copy your migration code'] = 'Copy your migration code'
en['Copy'] = 'Copy'
en['Copied'] = 'Copied!'
en['Paste your migration code'] = 'Paste your migration code'
en['Save'] = 'Save'
en['override the statistics'] = 'Are you sure you want to override the game statistics on this device? This action is not reversible.'
en['The game will now reload'] = 'The game will now reload.'

en['DATEPICKER_TITLE'] = 'Choose a past date'
en['DATEPICKER_TODAY_TEXT'] = 'Choose today'
en['DATEPICKER_CHOOSE_TEXT'] = 'Choose $text1'

en['Jump to a past date 1'] = 'And jump to a past date '
en['Jump to a past date 2'] = ' to play one more game?'

export let ja = {} as TranslationType

ja['KOFI_LINK'] = KOFI_LINK
ja['For keyboard input'] = 'キーボード入力用'

ja['Settings'] = '設定'
ja['Language'] = 'Language 言語'
ja['Switch to language'] = 'English'
ja['Timezone'] = 'タイムゾーンの設定'
ja['Layout'] = 'レイアウト'
ja['LAYOUT_DESCRIPTION'] = 'キーボードと音図のレイアウトを選択できます。'
ja['Hint Mode'] = 'ヒントモード'
ja['HINT_MODE_DESCRIPTION'] = '三種類のヒント（丸と上下矢印と左右矢印）が追加で表示されます。'
ja['Hard Mode'] = 'ハードモード'
ja['HARD_MODE_DESCRIPTION'] = '開示されたヒント（$text1 と $text2）を満たす単語だけが入力できます。'
ja['Dark Mode'] = 'ダークモード'
ja['High Contrast Mode'] = 'ハイコントラストモード'
ja['HIGH_CONTRAST_MODE_DESCRIPTION'] = '色覚特性モード'
ja['Feedback'] = 'フィードバック'

ja['This game is the'] = '「言葉で遊ぼう」は、有名で人気な単語パズルゲームの'
ja['Japanese version'] = '日本語版'
ja['word guessing game'] = 'です。このゲームは、この'
ja['open source version'] = 'オープンソース版'
ja['massive development'] = 'からフォークして大規模なソフトウェア再開発を経ています。また、日本語の特徴に合わせて、新しいモードと要素が追加されています。'

ja['own passion project'] = '「言葉で遊ぼう」は、自分の日本語学習への情熱プロジェクトから、日本内外のプレイヤーに人気のゲームになりました。正直なところ、すごくワクワクしています！'
ja['If you enjoy'] = 'このゲームを楽しんで、私のアプリ開発をサポートしたい場合は、よろしければ'
ja['buying me a coffee'] = '私にコーヒーを一杯おごる'
ja['if you wish'] = '♥️ こともできます。'
ja['Buy me a coffee?'] = 'おごっていただけますか？♥️ ' + KOFI_LINK
ja['do my best'] = 'このゲームを改良し続けるために最善を尽くします！'
ja['much love to'] = '応援してくださった皆様、本当にありがとう ♥️'

ja['If you love this game'] = 'このゲームを楽しんでいる場合は、'
ja['Please consider'] = ''
ja['can you treat me'] = 'コーヒーをおごって'
ja['please?'] = 'いただけますか？'

ja['GAME_COPIED_MESSAGE'] = '成績をクリップボードにコピーしました'
ja['NOT_ENOUGH_LETTERS_MESSAGE'] = '「$text1」は ' + MAX_WORD_LENGTH + '文字の単語ではありません。' + MAX_WORD_LENGTH + '文字入力してください。'
ja['WORD_NOT_FOUND_MESSAGE'] = 'この答えは単語リストにありません'
ja['TIMEZONE_ALERT_MESSAGE'] = 'タイムゾーンをゲーム開始時にのみ設定することができます'
ja['HINT_MODE_ALERT_MESSAGE'] = 'ヒントモードは、ゲーム開始時と終了時にのみオフにすることができます'
ja['HARD_MODE_ALERT_MESSAGE'] = 'ハードモードは、ゲーム開始時と終了時にのみオンにすることができます'
ja['PAST_CORRECT_WORD_MESSAGE'] = '第$text1回の正解は'
ja['CORRECT_WORD_MESSAGE'] = '今回の正解は'
ja['WRONG_SPOT_MESSAGE'] = '$text2文字目は「$text1」でないといけません。'
ja['NOT_CONTAINED_MESSAGE'] = '「$text1」を答えに含める必要があります。'

ja['SUPPORT_TITLE'] = 'サポート'
ja['STATISTICS_TITLE'] = '統計情報'
ja['GUESS_DISTRIBUTION_TEXT'] = '推測数の分布'
ja['NEW_WORD_TEXT'] = '次の単語まで'
ja['SHARE_TEXT'] = 'シェア'
ja['LINE_TEXT'] = 'ライン'
ja['THREADS_TEXT'] = 'スレッズ'
ja['BLUESKY_TEXT'] = 'ブルースカイ'
ja['TWEET_TEXT'] = 'ツイート'
ja['TOTAL_TRIES_TEXT'] = 'プレイ回数'
ja['SUCCESS_RATE_TEXT'] = '勝率'
ja['CURRENT_STREAK_TEXT'] = '現在の連勝数'
ja['BEST_STREAK_TEXT'] = '最大連勝数'

ja['MIGRATE_DESCRIPTION_TEXT'] = '統計情報を新しいデバイスに転送するには、ここをクリックしてください。'
ja['MIGRATE_BUTTON_TEXT'] = '転送'
ja['Transfer your statistics'] = '統計情報の転送'
ja['Copy the migration code'] = '古いデバイスで転送コードをコピーし、新しいデバイスの入力欄に貼り付けてください。'
ja['This is my'] = 'これが'
ja['old device'] = '古いデバイス'
ja['new device'] = '新しいデバイス'
ja['Copy your migration code'] = '転送コードをコピーしてください'
ja['Copy'] = 'コピー'
ja['Copied'] = 'コピーしました！'
ja['Paste your migration code'] = '転送コードを貼り付けてください'
ja['Save'] = '保存'
ja['override the statistics'] = 'このデバイスのゲーム統計情報を上書きしますか？この操作を元に戻すことはできません。'
ja['The game will now reload'] = 'このゲームがリロードされます。'

ja['DATEPICKER_TITLE'] = '過去問の日付選択'
ja['DATEPICKER_TODAY_TEXT'] = '今日を選択'
ja['DATEPICKER_CHOOSE_TEXT'] = '$text1を選択'

ja['Jump to a past date 1'] = 'もう一回？過去問の日付 '
ja['Jump to a past date 2'] = ' を選択してください。'

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

export const CLOSE_STATUS_KATAKANA = [
  'アァ',
  'イィ',
  'ウヴゥ',
  'エェ',
  'オォ',
  'ヤャ',
  'ユュ',
  'ヨョ',
  'カガ',
  'キギ',
  'クグ',
  'ケゲ',
  'コゴ',
  'サザ',
  'シジ',
  'スズ',
  'セゼ',
  'ソゾ',
  'タダ',
  'チヂ',
  'ツヅッ',
  'テデ',
  'トド',
  'ハバパ',
  'ヒビピ',
  'フブプ',
  'ヘベペ',
  'ホボポ',
]

export const CONSONANT_STATUS_KATAKANA = [
  'アイウエオァィゥェォ',
  'カキクケコガギグゲゴ',
  'サシスセソザジズゼゾ',
  'タチツテトダヂヅデドッ',
  'ナニヌネノ',
  'ハヒフヘホバビブベボパピプペポ',
  'マミムメモ',
  'ヤユヨャュョ',
  'ラリルレロ',
  'ワヲ',
]

export const VOWEL_STATUS_KATAKANA = [
  'ァアカサタナハマヤラワガザダバパャ',
  'ィイキシチニヒミリギジヂビピ',
  'ゥウクスツヌフムユルヴグズヅッブプュ',
  'ェエケセテネヘメレゲゼデベペ',
  'ォオコソトノホモヨロヲゴゾドボポョ',  
]

export const CLOSE_STATUS_HIRAGANA = [
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

export const CONSONANT_STATUS_HIRAGANA = [
  'あいうえおぁぃぅぇぉ',
  'かきくけこがぎぐげご',
  'さしすせそざじずぜぞ',
  'たちつてとだぢづでどっ',
  'なにぬねの',
  'はひふへほばびぶべぼぱぴぷぺぽ',
  'まみむめも',
  'やゆよゃゅょ',
  'らりるれろ',
  'わを',
]

export const VOWEL_STATUS_HIRAGANA = [
  'ぁあかさたなはまやらわがざだばぱゃ',
  'ぃいきしちにひみりぎじぢびぴ',
  'ぅうくすつぬふむゆるゔぐずづっぶぷゅ',
  'ぇえけせてねへめれげぜでべぺ',
  'ぉおこそとのほもよろをごぞどぼぽょ',  
]
