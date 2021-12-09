const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const grid = data.split("\r\n").map(line => line.split("").map(Number))
function findBasins(x, y, basins){
    if(!basins) basins = []
    const current = grid[y][x]
    const valTable = {
        [x + "," + (y - 1)]: grid[y - 1] ? grid[y - 1][x] : 9,
        [(x + 1) + "," + y]: grid[y][x + 1] ?? 9,
        [x + "," + (y + 1)]: grid[y + 1] ? grid[y + 1][x] : 9,
        [(x - 1) + "," + y]: grid[y][x - 1] ?? 9
    }
    const continueHere = []
    for(const coord in valTable){
        const value = valTable[coord]
        if(!basins.includes(coord) && value !== 9 && value > current){
            continueHere.push(coord.split(",").map(Number))
        }
    }
    basins.push(x + "," + y)
    if(continueHere.length === 0){
        return basins
    }
    return continueHere.map(coord => findBasins(coord[0], coord[1], basins)).flat(1).filter((val, index, ar) => ar.indexOf(val) === index)
}
const lowPoints = grid.map((line, y) => line.map((number, x) => [grid[y - 1] ? grid[y - 1][x] : null, grid[y][x + 1] ?? null, grid[y + 1] ? grid[y + 1][x] : null, grid[y][x - 1] ?? null].every(aNumber => aNumber === null || aNumber > number) ? [x, y] : null)).flat(1).filter(number => number !== null)
const basinLengths = (lowPoints.map(coord => findBasins(coord[0], coord[1])).map(basin => basin.length)).sort((a, b) => a - b).reverse()
console.log("Sizes of three largest basins multiplied:", basinLengths[0] * basinLengths[1] * basinLengths[2])