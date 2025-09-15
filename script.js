const holes = document.querySelector('.hole-container');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');

let score = 0;
let time = 30;
let gameInterval;
let moleInterval;

// 10個の穴をHTMLに動的に生成
for (let i = 0; i < 10; i++) {
    const holeDiv = document.createElement('div');
    holeDiv.classList.add('hole');
    const moleImage = document.createElement('img');
    moleImage.src = 'images/nanahara.png'; // 画像のパスを指定
    moleImage.classList.add('mole');
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
    }, 700); // 0.7秒後に隠れる
}

// ゲーム開始処理
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    moleInterval = setInterval(randomHole, 1000); // 1秒ごとにモグラを出す
    gameInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        if (time <= 0) {
            clearInterval(moleInterval);
            clearInterval(gameInterval);
            alert('ゲーム終了！あなたの点数は' + score + '点です。');
        }
    }, 1000); // 1秒ごとに時間を減らす
}

// モグラを叩いた時の処理
allHoles.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('up')) {
            score++;
            scoreDisplay.textContent = score;
            hole.classList.remove('up');

            // 叩いた画像を一時的に非表示にする
            const moleImage = hole.querySelector('.mole');
            moleImage.style.visibility = 'hidden';

            // 0.1秒後に再び表示する
            setTimeout(() => {
                moleImage.style.visibility = 'visible';
            }, 100);
        }
    });
});

startButton.addEventListener('click', startGame);
