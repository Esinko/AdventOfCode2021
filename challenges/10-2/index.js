const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const lines = data.split("\r\n")
const conversionTable = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}
const pointTable = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}
const scores = []
for(let i = 0; i < lines.length; i++){
    const line = lines[i]
    let buffer = ""
    let errored = false
    const chars = line.split("")
    for(let ii = 0; ii < chars.length; ii++){
        const char = chars[ii]
        if(Object.keys(conversionTable).includes(char)) {
            buffer += char
            continue
        }
        const expected = conversionTable[buffer[buffer.length - 1]]
        if(char !== expected){
            errored = true
            break
        }
        buffer = buffer.split("")
        buffer.pop()
        buffer = buffer.join("")
    }
    if(buffer.length !== 0 && errored === false) {
        const expected = buffer.split("").map(char => conversionTable[char]).reverse()
        scores.push(expected.reduce((prev, cur) => prev * 5 + pointTable[cur], 0))
    }
}
console.log("Middle score:", scores.sort((a, b) => a - b)[Math.floor((scores.length - 1) / 2)])