// Note: A very crude brute force solution, see 14-2
const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
let base = data.split("\r\n\r\n")[0].split("")
const instructions = data.split("\r\n\r\n")[1].split("\r\n").map(line => line.split(" -> "))
const steps = 10
function findCombination(combination){
    let buffer = ""
    let matches = []
    for(let i = 0; i < base.length; i++){
        const char = base[i]
        if(buffer.length === combination.length) buffer = buffer.substr(1) + char
        else buffer += char
        if(buffer === combination){
            matches.push(i - (buffer.length - 1))
        }
    }
    return matches
}
for(let i = 0; i < steps; i++){
    let inserts = []
    for(const instruction of instructions){
        const positions = findCombination(instruction[0])
        if(positions.length !== 0) {
            positions.forEach(index => inserts.push([index, instruction[1]]))
        }
    }
    for(const insert of inserts){
        base = base.map((char, index) => index === insert[0] ? ( char.original === undefined ? { original: char, insert: [insert[1]] } : { original: char.original, insert: char.insert.concat([insert[1]]) } ) : char)
    }
    base = base.map(char => char.original !== undefined ? [char.original, char.insert] : char).flat(2)
}
const occurrences = base.map(char => (JSON.stringify({ char, seen: base.filter(_char => char === _char).length }))).filter((obj, index, ar) => ar.indexOf(obj) === index).map(str => JSON.parse(str)).sort((a, b) => a.seen - b.seen).reverse()
console.log("Subtraction of the quantity of the most common element and the quantity of the least common element:", occurrences[0].seen - occurrences[occurrences.length - 1].seen)