const holes = document.querySelector('.hole-container');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');

let score = 0;
let time = 30;
let gameInterval;
let moleInterval;

// 9個の穴をHTMLに動的に生成
for (let i = 0; i < 9; i++) {
    const holeDiv = document.createElement('div');
    holeDiv.classList.add('hole');
    
    // マンホールの画像を追加
    const holeImage = document.createElement('img');
    holeImage.src = 'images/manho-ru.png';
    holeImage.classList.add('hole-image');
    
    const moleImage = document.createElement('img');
    moleImage.src = 'images/nanahara.png';
    moleImage.classList.add('mole');
    
    holeDiv.appendChild(holeImage);
    holeDiv.appendChild(moleImage);
    holes.appendChild(holeDiv);
}

const allHoles = document.querySelectorAll('.hole');

// ランダムにモグラを表示する関数
function randomHole() {
    const random = Math.floor(Math.random() * allHoles.length);
    const hole = allHoles[random];
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
    }, 1000); // 700ミリ秒から1000ミリ秒に変更しました
}

// ゲーム開始処理
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    startButton.disabled = true;

    moleInterval = setInterval(randomHole, 1000);
    gameInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        if (time <= 0) {
            clearInterval(moleInterval);
            clearInterval(gameInterval);
            alert('ゲーム終了！あなたの点数は' + score + '点です。');
            startButton.disabled = false;
        }
    }, 1000);
}

// モグラを叩いた時の処理
allHoles.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('up')) {
            score++;
            scoreDisplay.textContent = score;
            
            const moleImage = hole.querySelector('.mole');
            moleImage.style.visibility = 'hidden';

            hole.classList.remove('up');

            setTimeout(() => {
                moleImage.style.visibility = 'visible';
            }, 100);
        }
    });
});

startButton.addEventListener('click', startGame);
