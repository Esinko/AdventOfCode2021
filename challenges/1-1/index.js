const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n")

let largerValues = 0

for(let i = 0;i < data.length; i++){
    const currentValue = parseInt(data[i].trim())
    const lastValue = data[i - 1] ? parseInt(data[i - 1].trim()) : NaN
    if(!isNaN(lastValue)){
        if(currentValue > lastValue) ++largerValues
    }
}
console.log("Larger than the previous measurement:", largerValues)