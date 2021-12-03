const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n").map(val => val.trim())
let common = data
let leastCommon = data
function findValues(array, isCommon, _position){
    const position = _position ?? 0
    const chars = array.map(val => val[position])
    const map = chars.reduce((ref, val) => { ref[val] = (ref[val] || 0 ) + 1; return ref }, {})
    const commonBit = Object.keys(map).reduce((a, b) => map[a] > map[b] ? a : b)
    array = array.filter(val => isCommon ? val[position] == commonBit : val[position] != commonBit)
    if(array.length !== 1) return findValues(array, isCommon, position + 1)
    else return array
}
console.log("The life support rating of the submarine:", (parseInt(findValues(common, true), 2) * parseInt(findValues(leastCommon, false), 2)))