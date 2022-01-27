var Mui = {

    "gametitle": "<small>Kotoba Asobou</small> 言葉遊ボウ",
    "gamename": "Kotoba Asobou 言葉遊ボウ",
    "gamesharelink": "\nhttps:\/\/taximanli.github.io\/kotobaasobou\/\n",

    "Hard Mode": "Hard Mode ハードモード",
    "Any revealed hints must be used in subsequent guesses": "Any revealed hints must be used in subsequent guesses.<br>開示されたすべてのヒントを満たす単語だけが入力できます",
    "Dark Theme": "Dark Theme ダークテーマ",
    "Colour Blind Mode": "Colour Blind Mode 色覚特性モード",
    "High contrast colours": "High contrast colours 色がハイコントラストになります",
    "Feedback": "Feedback フィードバック",
    "Copyright": "Copyright Josh Wardle 2021-"+(new Date().getFullYear())+". All Rights Reserved.<br>Adapted into Japanese by Desmond Lee.",

    "Guess must contain": "Guess must contain ###text###. ###text### を答えに含める必要があります。",

    "Not in word list": "Not in word list この答えは単語リストにありません",
    "Not valid in hard mode": "Not valid in hard mode ハードモードでは使用できません",
    "Not enough letters": "Not enough letters ４文字入力してください",
    "Hard mode can only be enabled at the start of a round": "Hard mode can only be enabled at the start of a round ハードモードは、ゲーム開始時にのみオンにすることができます",
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
  <p>今日の単語を12回以内に当ててください。それぞれの答えはひらがな４文字の単語である必要があります。入力ボタンを押して答えを決定してください。答えるたびに正方形の色が変わり、それが次のヒントになります。</p>\n  
  <div class="examples">\n  
    <p><strong>Examples 例</strong></p>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="ち" evaluation="correct" reveal></game-tile>\n  
        <game-tile letter="よ"></game-tile>\n  
        <game-tile letter="つ"></game-tile>\n  
        <game-tile letter="と"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>ち</strong> is in the word and in the correct spot.<br>仮名「ち」は単語の中にあり、正しい位置にあります。</p>\n  
    </div>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="す"></game-tile>\n  
        <game-tile letter="ぽ" evaluation="present" reveal></game-tile>\n  
        <game-tile letter="ー"></game-tile>\n  
        <game-tile letter="つ"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>ぽ</strong> is in the word but in the wrong spot.<br>仮名「ぽ」は単語の中にありますが、違う位置にあります。</p>\n  
    </div>\n  
    <div class="example">\n  
      <div class="row">\n  
        <game-tile letter="ぱ"></game-tile>\n  
        <game-tile letter="ー"></game-tile>\n  
        <game-tile letter="て" evaluation="absent" reveal></game-tile>\n  
        <game-tile letter="い"></game-tile>\n  
      </div>\n  
      <p>The kana <strong>て</strong> is not in the word in any spot.<br>仮名「て」は単語のどこにも含まれていません。</p>\n  
    </div>\n  
  </div>\n  
  <p><strong>A new word will be available each day!<br>単語は日替わりです！</strong></p>\n  
  <p>This game was designed by Josh Wardle and it was adapted into Japanese by Desmond Lee.</p>\n  
  <p>このゲームは Josh Wardle が開発し、Desmond Lee が日本語版を作りました。</p>\n  
</div>\n  
  </div>\n  
</div>\n  
</section>\n`;

var Ms = {
    currentStreak: "Current Streak 現在の連続正解回数",
    maxStreak: "Max Streak 最大連続回数",
    winPercentage: "Win % 勝率",
    gamesPlayed: "Played プレイ回数",
    gamesWon: "Won 勝利数",
    averageGuesses: "Average Guesses 平均推測回数",
};

var ss = [
    "Genius! 天才！",
    "Genius! 天才！",
    "Magnificent! 素晴らしい！",
    "Magnificent! 素晴らしい！",
    "Impressive! 立派！",
    "Impressive! 立派！",
    "Splendid! 素敵！",
    "Splendid! 素敵！",
    "Great! すごい！",
    "Great! すごい！",
    "Phew! セーフ！",
    "Phew! セーフ！",
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
