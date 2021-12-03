const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n").map(val => val.trim())
let gamma = ""
let epsilon = ""
for(let i = 0; i < data[0].length; i++){
    const position = i
    const chars = data.map(val => val.split("")[position])
    const map = chars.reduce((ref, val) => { ref[val] = (ref[val] || 0 ) + 1; return ref }, {})
    const commonBit = Object.keys(map).reduce((a, b) => map[a] > map[b] ? a : b)
    epsilon += commonBit == 1 ? "0" : "1"
    gamma += commonBit.toString()
}
console.log("Power consumption of the submarine:", parseInt(gamma, 2) * parseInt(epsilon, 2))