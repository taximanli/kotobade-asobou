// The launch date of Kotobade Asobou
var Ha = new Date(2021, 12, 23, 0, 0, 0, 0);

lang["local"] = {

    "gametitle": "<small>Kotobade Asobou</small> 言葉で遊ぼう",
    "gamename": "Kotobade Asobou 言葉で遊ぼう",
    "gamesharelink": "\nhttps:\/\/taximanli.github.io\/kotobade-asobou\/\n",

    "Hard Mode": "ハードモード",
    "Any revealed hints must be used in subsequent guesses": "開示されたすべてのヒントを満たす単語だけが入力できます",
    "Dark Theme": "ダークテーマ",
    "Colour Blind Mode": "色覚特性モード",
    "High contrast colours": "色がハイコントラストになります",
    "Feedback": "フィードバック",
    "Copyright": "",

    "letter must be": "###text3### 文字目は「###text4###」でないといけません。",
    "Guess must contain": "###text### を答えに含める必要があります。",

    "Not in word list": "この答えは単語リストにありません",
    "Not valid in hard mode": "ハードモードでは使用できません",
    "Not enough letters": "４文字入力してください",
    "Hard mode can only be enabled at the start of a round": "ハードモードは、ゲーム開始時にのみオンにすることができます",
    "Copied results to clipboard": "成績をクリップボードにコピーしました",
    "Share failed": "シェアに失敗しました",

    "Settings": "設定",
    "How to play": "遊び方",

    "Statistics": "統計情報",
    "Guess Distribution": "推測数の分布",

    "Next Game": "次のゲームまで",
    "Share": "シェア",

    "No Data" :"データがありません",

    currentStreak: "現在の連続正解回数",
    maxStreak: "最大連続回数",
    winPercentage: "勝率",
    gamesPlayed: "プレイ回数",
    gamesWon: "勝利数",
    averageGuesses: "平均推測回数",   
    
};

lang["local"]["gameinstruction"] =
`<section>\n  
<div class="instructions">\n  
  <p>Guess the word of the day in 12 tries.</p>\n  
  <p>Each guess must be a valid 4-kana word. Hit the enter button to submit.</p>\n  
  <p>After each guess, the colour of the tiles will change to show how close your guess was to the word.</p>\n  
  <p>今日の単語を１２回以内に当ててください。</p>\n  
  <p>それぞれの答えはひらがな４文字の単語である必要があります。入力ボタンを押して答えを決定してください。</p>\n  
  <p>答えるたびに正方形の色が変わり、それが次のヒントになります。</p>\n  
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
