const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const positions = data.split(",").map(Number)
const mean = Math.floor(positions.reduce((prev, cur) => prev + cur, 1) / positions.length)
const fuelCost = positions.reduce((prev, cur) => prev + Math.abs(cur - mean) * (Math.abs(cur - mean) + 1) / 2, 0)
console.log("Fuel cost to", mean, "is", fuelCost)