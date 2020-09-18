const screen = document.querySelector('#screen');
const ctx = screen.getContext('2d');

// Snake object
const snake = {
    pieces: [{ x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 5 }],
    color: '#373',
    direction: 'right',
};

const apple = {
    color: '#a33',
    pos: [Math.round(Math.random() * 31), Math.round(Math.random() * 23)],

    handleSetPosition() {
        const x = Math.round(Math.random() * 31);
        const y = Math.round(Math.random() * 23);

        this.pos = [x, y];
    }
};

// Keyboard listener
function handleKeyDown(e) {
    switch(e.key) {
        case 'ArrowRight':
            if (snake.direction === 'left') return;

            snake.direction = 'right';
            break;

        case 'ArrowLeft':
            if (snake.direction === 'right') return;

            snake.direction = 'left';
            break;

        case 'ArrowDown':
            if (snake.direction === 'up') return;

            snake.direction = 'down';
            break;

        case 'ArrowUp':
            if (snake.direction === 'down') return;

            snake.direction = 'up';
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);

// Draw gameObjects
function draw() {
    // Clear screen
    ctx.clearRect(0, 0, 32, 24);

    const { color, pieces } = snake;

    // Draw snake
    for (const piece of pieces) {
        ctx.fillStyle = color;
        ctx.fillRect(piece.x, piece.y, 1, 1);
    }

    ctx.fillStyle = apple.color;
    ctx.fillRect(...apple.pos, 1, 1);
}

// Restart game
function restart() {
    apple.handleSetPosition();
    snake.pieces = [{ x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 5 }];
    snake.direction = 'right';
}

// Game initialization
function game() {
    draw();

    const { direction, pieces } = snake;

    for (let i = pieces.length - 1; i > 0; i--) {
        pieces[i] = { ...pieces[i - 1] };
    }

    if (pieces[0].x === apple.pos[0] && pieces[0].y === apple.pos[1]) {
        apple.handleSetPosition();

        pieces.push({ x: -1, y: -1 });
    }

    if (pieces[0].x < 0 || pieces[0].x > 32 || pieces[0].y < 0 || pieces[0].y > 24) {
        restart();
    }
    
    switch(direction) {
        case 'right':
            pieces[0].x += 1;
            break;
        
        case 'left':
            pieces[0].x -= 1;
            break;

        case 'up':
            pieces[0].y -= 1;
            break;

        case 'down':
            pieces[0].y += 1;
            break;
    }
}

// Loop
setInterval(game, 100);