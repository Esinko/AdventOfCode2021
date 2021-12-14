const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const pairs = {}
const base = data.split("\r\n\r\n")[0]
const instructions = {}
// Prepare
for(const pair of data.split("\r\n\r\n")[1].split("\r\n")) instructions[pair.split(" -> ")[0]] = pair.split(" -> ")[1]
for(const instruction of Object.keys(instructions)) pairs[instruction] = 0
for(let i = 0; i < base.length - 1; i++) ++pairs[base[i] + base[i + 1]]
// Exec
const steps = 400
for(let i = 0; i < steps; i++){
    const currentPairs = JSON.parse(JSON.stringify(pairs)) // Force data to clone
    for(const pair of Object.keys(pairs)){
        pairs[pair] -= currentPairs[pair]
        pairs[pair[0] + instructions[pair]] += currentPairs[pair]
        pairs[instructions[pair] + pair[1]] += currentPairs[pair]
    }
}
// Finalize
const count = {}
for(const pair of Object.keys(pairs)){
    if(!count[pair[0]]) count[pair[0]] = 0
    if(!count[pair[1]]) count[pair[1]] = 0
    count[pair[0]] += pairs[pair] / 2
    count[pair[1]] += pairs[pair] / 2
}
const output =  Object.keys(count).map(sCount => Math.round(count[sCount])).sort((a, b) => a - b).reverse()
console.log("Subtraction of the quantity of the most common element and the quantity of the least common element:", output[0] - output[output.length - 1])