const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n")
let depth = 0
let horizontalPosition = 0
for(const entry of data){
    const split = entry.split(" ")
    if(split.length < 2) throw "Malformed data: \"" + entry + "\""
    const instruction = split[0]
    const value = parseInt(split[1].trim())
    if(isNaN(value)) throw "Unable to parse value: \"" + entry + "\""
    switch(instruction){
        case "forward": {
            horizontalPosition += value
            break
        }
        case "up": {
            depth -= value
            break
        }
        case "down": {
            depth += value
            break
        }
        default: {
            console.error("Unexpected instruction:", entry)
        }
    }
}
console.log("Final horizontal position multiplied by your final depth:", (depth * horizontalPosition))