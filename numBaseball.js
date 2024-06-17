function getRandomNumbers() {
    const numbers = Array.from({ length: 10 }, (_, i) => i); // 0부터 9까지의 숫자 배열 생성
    const result = [];

    /*중복되지않게 3개 수 배열 생성*/
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length); 
        result.push(numbers[randomIndex]); 
        numbers.splice(randomIndex, 1); 
    }

    return result;
}

function getSB(secret, guess) {
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            strikes++;
        } else if (secret.includes(guess[i])) {
            balls++;
        }
    }

    return { strikes, balls };
}

const secretNumbers = getRandomNumbers();
let cnt = 0;
let end = false;

document.getElementById('secretNumbers').textContent = `Secret Numbers (for debugging): ${secretNumbers.join('')}`;

function processGuess() {
    if (end) return;
    const guess = document.getElementById('userInput').value;
    if (guess.length !== 3 || !/^\d{3}$/.test(guess)) { // 세 자리 숫자인지 검사
        alert("세자리 숫자를 입력하세요 (예: 123)");
        return;
    }

    const guessNumbers = Array.from(guess).map(Number);
    cnt++;

    const { strikes, balls } = getSB(secretNumbers, guessNumbers);

    const attemptsElement = document.getElementById('attempts');
    const resultElement = document.getElementById('result');

    // 시도 결과와 줄 바꿈을 추가하여 표시
    attemptsElement.innerHTML += `${cnt}번째 시도: ${guessNumbers.join('')} -> ${strikes}S ${balls}B<br>`;

    if (strikes === 3) {
        resultElement.innerHTML = `${cnt}번만에 맞히셨습니다. 게임을 종료합니다.`;
        document.getElementById('userInput').disabled = true; // 입력 필드 비활성화
        document.getElementById('submitButton').disabled = true; // 버튼 비활성화
        end= true;
    }
}