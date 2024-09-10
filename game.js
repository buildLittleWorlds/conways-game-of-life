const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 50;
const CELL_SIZE = 10;
const DELAY = 100; // Delay between generations in milliseconds

canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;

let grid = createGrid(GRID_SIZE);

function createGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

function randomizeGrid(grid) {
    return grid.map(row => row.map(() => Math.random() > 0.7 ? 1 : 0));
}

function drawGrid(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1) {
                ctx.fillStyle = '#61dafb';
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function getNextGeneration(grid) {
    const newGrid = createGrid(grid.length);

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const neighbors = countNeighbors(grid, row, col);
            if (grid[row][col] === 1) {
                if (neighbors === 2 || neighbors === 3) {
                    newGrid[row][col] = 1;
                } else {
                    newGrid[row][col] = 0;
                }
            } else {
                if (neighbors === 3) {
                    newGrid[row][col] = 1;
                }
            }
        }
    }

    return newGrid;
}

function countNeighbors(grid, row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[row].length) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}

function gameLoop() {
    grid = getNextGeneration(grid);
    drawGrid(grid);
    setTimeout(gameLoop, DELAY);
}

// Initialize the grid with some random live cells
grid = randomizeGrid(grid);

// Start the game loop
gameLoop();