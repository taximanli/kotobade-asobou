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
export const GAME_COPIED_MESSAGE = 'Copied results to clipboard 成績をクリップボードにコピーしました'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters 4文字入力してください'
export const WORD_NOT_FOUND_MESSAGE = 'Not in word list この答えは単語リストにありません'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}. 今日の正解は「${solution}」です。`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = '⏎'
export const DELETE_TEXT = '⇦'
export const STATISTICS_TITLE = 'Statistics 統計情報'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution 推測数の分布'
export const NEW_WORD_TEXT = 'Next word in 次の単語まで'
export const SHARE_TEXT = 'Share シェア'
export const TOTAL_TRIES_TEXT = 'Games Played プレイ回数'
export const SUCCESS_RATE_TEXT = 'Success Rate 勝率'
export const CURRENT_STREAK_TEXT = 'Current Streak 現在の連勝数'
export const BEST_STREAK_TEXT = 'Best Streak 最大連勝数'

