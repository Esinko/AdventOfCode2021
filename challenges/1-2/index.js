const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n")
let largerSums = 0
let lastValue = null
for(let i = 1; i < data.length; i++){
    const firstValue = data[i - 1] ? parseInt(data[i - 1].trim()) : NaN
    const currentValue = data[i] ? parseInt(data[i].trim()) : NaN
    const nextValue = data[i + 1] ? parseInt(data[i + 1].trim()) : NaN
    if(
        !isNaN(firstValue) &&
        !isNaN(currentValue) &&
        !isNaN(nextValue)
    ){
        const sum = firstValue + currentValue + nextValue
        if(
            lastValue !== null &&
            lastValue < sum
        ) ++largerSums
        lastValue = sum
    }   
}
console.log("Sums larger than the previous sum:", largerSums)