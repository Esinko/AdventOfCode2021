const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const positions = data.split(",").map(Number)
const median = positions.sort((a, b) => a - b)[positions.length / 2]
const fuelCost = positions.reduce((prev, cur) => prev + Math.abs(cur - median), 0)
console.log("Fuel cost to", median, "is", fuelCost)