var Mui = {

    "gametitle": "<small>Kotoba Asobou</small> 言葉遊ボウ",
    "gamename": "Kotoba Asobou 言葉遊ボウ",
    "gamesharelink": "\nhttps:\/\/taximanli.github.io\/kotobaasobou\/\n",

    "Hard Mode": "Hard Mode 難しいモード",
    "Any revealed hints must be used in subsequent guesses": "Any revealed hints must be used in subsequent guesses.<br>後続の推測では、明らかにされたヒントを使用する必要があります。",
    "Dark Theme": "Dark Theme 暗いテーマ",
    "Colour Blind Mode": "Colour Blind Mode 色覚特性モード",
    "High contrast colours": "High contrast colours 高コントラストの色",
    "Feedback": "Feedback フィードバック",
    "Copyright": "Copyright Josh Wardle 2021-"+(new Date().getFullYear())+". All Rights Reserved.<br>Adapted into Japanese by Desmond Lee.",

    "Guess must contain": "Guess must contain ###text###. この答えには ###text### が含まれている必要があります。",

    "Not in word list": "Not in word list この答えは単語リストにありません",
    "Not valid in hard mode": "Not valid in hard mode 難しいモードでは使用できません",
    "Not enough letters": "Not enough letters ４文字を入力してください",
    "Hard mode can only be enabled at the start of a round": "Hard mode can only be enabled at the start of a round",
    "Copied results to clipboard": "Copied results to clipboard 成績をクリップボードにコピーしました",
    "Share failed": "Share failed",

    "Settings": "Settings 設定",
    "How to play": "How to play 遊び方",

    "Statistics": "Statistics 統計情報",
    "Guess Distribution": "Guess Distribution 推測数の分布",

    "Next Game": "Next Game<br>次のゲームまで",
    "Share": "Share シェア",

    "No Data" :"No Data データがありません",
    
};

Mui["gameinstruction"] =
`<section>\n  
<div class="instructions">\n  
  <p>Guess the word of the day in 12 tries.</p>\n  
  <p>Each guess must be a valid 4-kana word. Hit the enter button to submit.</p>\n  
  <p>After each guess, the colour of the tiles will change to show how close your guess was to the word.</p>\n  
  <p>今日の単語を１２回以内に推測してください。各答えは仮名４字の単語である必要があります。入力ボタンを押して答えを送信してください。答えるたびに、正方形の色が変わり、次の推測のヒントになります。</p>\n  
  <div class="examples">\n  
    <p><strong>Examples 例</strong></p>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="ち" evaluation="correct" reveal></game-tile>\n  
        <game-tile letter="よ"></game-tile>\n  
        <game-tile letter="つ"></game-tile>\n  
        <game-tile letter="と"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>ち</strong> is in the word and in the correct spot.<br>仮名「ち」は単語の中にあり、単語の正しい位置にあります。</p>\n  
    </div>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="す"></game-tile>\n  
        <game-tile letter="ぽ" evaluation="present" reveal></game-tile>\n  
        <game-tile letter="ー"></game-tile>\n  
        <game-tile letter="つ"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>ぽ</strong> is in the word but in the wrong spot.<br>仮名「ぽ」は単語の中にありますが、単語の間違った位置にあります。</p>\n  
    </div>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="ぱ"></game-tile>\n  
        <game-tile letter="ー"></game-tile>\n  
        <game-tile letter="て" evaluation="absent" reveal></game-tile>\n  
        <game-tile letter="い"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>て</strong> is not in the word in any spot.<br>仮名「て」はどの位置でも単語に含まれていません。</p>\n  
    </div>\n  
  </div>\n  
  <p><strong>A new word will be available each day!<br>毎日新しい単語があります！</strong></p>\n  
  <p>This game was designed by Josh Wardle and it was adapted into Japanese by Desmond Lee.</p>\n  
  <p>このゲームは Josh Wardle によって設計され、Desmond Lee によって日本語に作り替えられました。</p>\n  
</div>\n  
  </div>\n  
</div>\n  
</section>\n`;

var Ms = {
    currentStreak: "Current Streak 現在のストリーク",
    maxStreak: "Max Streak 最大ストリーク",
    winPercentage: "Win 勝利 %",
    gamesPlayed: "Played 回遊びました",
    gamesWon: "Won 回勝ちました。",
    averageGuesses: "Average Guesses 推測の平均数",
};

var ss = [
    "You are a genius! 天才ですよ！",
    "You are a genius! 天才ですよ！",
    "Magnificent! 素晴らしい！",
    "Magnificent! 素晴らしい！",
    "Impressive! 立派！",
    "Impressive! 立派！",
    "Splendid! 素敵！",
    "Splendid! 素敵！",
    "Great! すごい！",
    "Great! すごい！",
    "Phew! よし！",
    "Phew! よし！",
  ];

var ds = [

    ["ん","わ","ら","や","ま","は","な","た","さ","か","あ"],
    ["-","-","り","-","み","ひ","に","ち","し","き","い"],
    ["ー","-","る","ゆ","む","ふ","ぬ","つ","す","く","う"],
    ["-","-","れ","-","め","へ","ね","て","せ","け","え"],
    ["-","を","ろ","よ","も","ほ","の","と","そ","こ","お"],
    [],
    [],
    ["-","-","-","-","ぱ","ば","-","だ","ざ","が","-"],
    ["-","-","-","-","ぴ","び","-","ぢ","じ","ぎ","-"],
    ["-","-","-","-","ぷ","ぶ","-","づ","ず","ぐ","ゔ"],
    ["-","-","-","-","ぺ","べ","-","で","ぜ","げ","-"],
    ["â†µ","-","-","-","ぽ","ぼ","-","ど","ぞ","ご","â†"],        

  ];
