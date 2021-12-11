const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
let grid = data.split("\r\n").map(line => line.split("").map(Number))
const steps = 1000000 // Just a large number, can be Infinity if needed
let stepFlashed = []
async function flash(x, y){
    const value = grid[y][x]
    const adjacent = {
        // Top
        [x + "," + (y - 1)]: grid[y - 1] !== undefined ? grid[y - 1][x] : null, 
        // Top right
        [(x + 1) + "," + (y - 1)]: grid[y - 1] !== undefined ? grid[y - 1][x + 1] !== undefined ? grid[y - 1][x + 1] : null : null,
        // Right
        [(x + 1) + "," + y]: grid[y][x + 1] !== undefined ? grid[y][x + 1] : null,
        // Bottom right
        [(x + 1) + "," + (y + 1)]: grid[y + 1] !== undefined ? grid[y + 1][x + 1] !== undefined ? grid[y + 1][x + 1] : null : null,
        // Bottom
        [x + "," + (y + 1)]: grid[y + 1] !== undefined ? grid[y + 1][x] : null,
        // Bottom left
        [(x - 1) + "," + (y + 1)]: grid[y + 1] !== undefined ? grid[y + 1][x - 1] !== undefined ? grid[y + 1][x - 1] : null : null,
        // Left
        [(x - 1) + "," + y]: grid[y][x - 1] !== undefined ? grid[y][x - 1] : null,
        // Top left
        [(x - 1) + "," + (y - 1)]: grid[y - 1] !== undefined ? grid[y - 1][x - 1] !== undefined ? grid[y - 1][x - 1] : null : null
    }
    if(value > 9 && !stepFlashed.includes(x + "," + y)){ // Flash!
        stepFlashed.push(x + "," + y)
        for(const coord in adjacent){
            const xy = coord.split(",").map(Number)
            if(adjacent[coord] === null) continue
            ++grid[xy[1]][xy[0]]
            flash(xy[0], xy[1])
        }
    }
}
for(let i = 0; i < steps; i++){
    stepFlashed = []
    grid = grid.map(line => line.map(number => number + 1)) // Bump power level
    for(let y = 0; y < grid.length; y++){ // Flash
        for(let x = 0; x < grid[y].length; x++){
            flash(x, y)
        }
    }
    for(const flashed of stepFlashed){ // Reset flashed
        const xy = flashed.split(",").map(Number)
        grid[xy[1]][xy[0]] = 0
    }
    if(stepFlashed.length === grid.flat(1).length){
        console.log("The first step on which all octopuses flash:", i + 1)
        process.exit()
    }
}
console.log("No group flashes after", steps, "calculations.")