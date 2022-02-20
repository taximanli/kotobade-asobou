import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          'For keyboard input': 'Type here',
          Settings: 'Settings',
          'Hint Mode': 'Hint Mode',
          'Hard Mode': 'Hard Mode',
          'Any revealed hints must be used in subsequent guesses':
            'Any revealed hints must be used in subsequent guesses.',
          'Dark Mode': 'Dark Mode',
          'High Contrast Mode': 'High Contrast Mode',
          Feedback: 'Feedback',
          'This is an': 'This is an',
          'open source version': 'open source version',
          'This game was adapted':
            'of the word guessing game we all know and love. This game was adapted into Japanese by Desmond Lee.',
          GAME_COPIED_MESSAGE: 'Copied results to clipboard',
          NOT_ENOUGH_LETTERS_MESSAGE: 'Not enough letters',
          WORD_NOT_FOUND_MESSAGE: 'Not in word list',
          HINT_MODE_ALERT_MESSAGE:
            'Hint Mode can only be turned off at the start',
          HARD_MODE_ALERT_MESSAGE:
            'Hard Mode can only be turned on at the start',
          STATISTICS_TITLE: 'Statistics',
          GUESS_DISTRIBUTION_TEXT: 'Guess Distribution',
          NEW_WORD_TEXT: 'Next word in',
          SHARE_TEXT: 'Share',
          TOTAL_TRIES_TEXT: 'Games Played',
          SUCCESS_RATE_TEXT: 'Success Rate',
          CURRENT_STREAK_TEXT: 'Current Streak',
          BEST_STREAK_TEXT: 'Best Streak',
        },
      },
      ja: {
        translation: {
          'For keyboard input': 'キーボード入力用',
          Settings: '設定',
          'Hint Mode': 'ヒントモード',
          'Hard Mode': 'ハードモード',
          'Any revealed hints must be used in subsequent guesses':
            '開示されたすべてのヒントを満たす単語だけが入力できます。',
          'Dark Mode': 'ダークモード',
          'High Contrast Mode': 'ハイコントラストモード',
          Feedback: 'フィードバック',
          'This is an':
            'これは、私たち皆が知っていて大好きな単語パズルゲームの',
          'open source version': 'オープンソース版',
          'This game was adapted':
            'です。このゲームは Desmond Lee が日本語版を作りました。',
          GAME_COPIED_MESSAGE: '成績をクリップボードにコピーしました',
          NOT_ENOUGH_LETTERS_MESSAGE: '4文字入力してください',
          WORD_NOT_FOUND_MESSAGE: 'この答えは単語リストにありません',
          HINT_MODE_ALERT_MESSAGE:
            'ヒントモードは、ゲーム開始時にのみオフにすることができます',
          HARD_MODE_ALERT_MESSAGE:
            'ハードモードは、ゲーム開始時にのみオンにすることができます',
          STATISTICS_TITLE: '統計情報',
          GUESS_DISTRIBUTION_TEXT: '推測数の分布',
          NEW_WORD_TEXT: '次の単語まで',
          SHARE_TEXT: 'シェア',
          TOTAL_TRIES_TEXT: 'プレイ回数',
          SUCCESS_RATE_TEXT: '勝率',
          CURRENT_STREAK_TEXT: '現在の連勝数',
          BEST_STREAK_TEXT: '最大連勝数',
        },
      },
    },
  })

export default i18n
