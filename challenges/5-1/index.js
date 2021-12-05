const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim().split("\r\n")
const points = data.map(line => line.split(" -> ").map(coord => coord.split(",").map(val => parseInt(val)))).map(line => {
    if(line[0][0] === line[1][0]){
        // horizontal lines
        if(line[0][1] > line[1][1]) return [line[1]].concat(Array.from({ length: line[0][1] - line[1][1] }, (_, c) => line[1][1] + c + 1).map(val => [line[0][0], val]))
        else return [line[0]].concat(Array.from({ length: line[1][1] - line[0][1] }, (_, c) => line[0][1] + c + 1).map(val => [line[0][0], val]))
    }else if(line[0][1] === line[1][1]){
        // vertical lines
        if(line[0][0] > line[1][0]) return [line[1]].concat(Array.from({ length: line[0][0] - line[1][0] }, (_, c) => line[1][0] + c + 1).map(val => [val, line[0][1]]))
        else return [line[0]].concat(Array.from({ length: line[1][0] - line[0][0] }, (_, c) => line[0][0] + c + 1).map(val => [val, line[0][1]]))
    }
    return []
}).flat(1).reduce((prev, cur) => (prev[cur.toString()] = prev[cur.toString()] + 1 || 1, prev), {}) // object, coordinates as the key and the value as the times that point was visited
console.log("Points where at least two lines do overlap:", Object.keys(points).filter(coord => points[coord] > 1).length)