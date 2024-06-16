const gameArea = document.getElementById('gameArea');
const gameAreaSize = 500;
const gridSize = 20;

let snake = [{ x: 500, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

document.addEventListener('keydown', changeDirection);
placeFood();
setInterval(gameLoop, 100);

function gameLoop() {
    moveSnake();
    if (isGameOver()) {
        alert('Game Over! Your score: ' + score);
        resetGame();
    } else {
        drawGame();
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function drawGame() {
    gameArea.innerHTML = '';
    snake.forEach(part => drawSnakePart(part));
    drawFood(food);
}

function drawSnakePart(part) {
    const snakeElement = document.createElement('div');
    snakeElement.style.position = 'absolute';
    snakeElement.style.width = gridSize + 'px';
    snakeElement.style.height = gridSize + 'px';
    snakeElement.style.left = part.x + 'px';
    snakeElement.style.top = part.y + 'px';
    snakeElement.style.backgroundColor = 'yellow';
    gameArea.appendChild(snakeElement);
}

function drawFood(position) {
    const foodElement = document.createElement('div');
    foodElement.style.position = 'absolute';
    foodElement.style.width = gridSize + 'px';
    foodElement.style.height = gridSize + 'px';
    foodElement.style.left = position.x + 'px';
    foodElement.style.top = position.y + 'px';
    foodElement.style.backgroundColor = 'red';
    gameArea.appendChild(foodElement);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (gameAreaSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (gameAreaSize / gridSize)) * gridSize;
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gameAreaSize || head.y < 0 || head.y >= gameAreaSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    placeFood();
}