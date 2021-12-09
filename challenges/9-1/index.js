const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString()
const grid = data.split("\r\n").map(line => line.split("").map(Number))
const Risk = grid.map((line, y) => line.map((number, x) => [grid[y - 1] ? grid[y - 1][x] : null, grid[y][x + 1] ?? null, grid[y + 1] ? grid[y + 1][x] : null, grid[y][x - 1] ?? null].every(aNumber => aNumber === null || aNumber > number) ? number + 1 : null)).flat(1).filter(number => number !== null).reduce((prev, cur) => prev + cur)
console.log("Combined risk of all low points:", Risk)