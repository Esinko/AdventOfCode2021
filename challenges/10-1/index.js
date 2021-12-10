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
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}
const foundIllegalChars = {}
for(const line of lines){
    let buffer = ""
    for(const char of line.split("")){
        if(Object.keys(conversionTable).includes(char)) buffer += char
        else {
            const expected = conversionTable[buffer[buffer.length - 1]]
            if(char !== expected){
                if(!Object.keys(pointTable).includes(char)) break
                if(foundIllegalChars[char] === undefined) foundIllegalChars[char] = 1
                else ++foundIllegalChars[char]
                break
            }
            buffer = buffer.split("")
            buffer.pop()
            buffer = buffer.join("")
        }
    }
}
console.log("Total syntax error score:", Object.keys(foundIllegalChars).map(char => foundIllegalChars[char] * pointTable[char]).reduce((prev, cur) => prev + cur))