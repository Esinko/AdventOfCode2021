const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim().split(",")
let fish = data.map(val => parseInt(val))
const daysToSimulate = 80
for(let i = 1; i < daysToSimulate + 1; i++) fish = fish.map(val => val !== 0 ? --val : [6, 8]).flat(1)
console.log("Lanternfish after", daysToSimulate, "days:", fish.length)