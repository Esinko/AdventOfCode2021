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
    }else {
        // diagonal lines
        let coveringPoints = [[], []]
        const yCoordinates = line.map(cord => cord[1])
        const xCoordinates = line.map(cord => cord[0])
        if(xCoordinates[1] > xCoordinates[0]) coveringPoints[0] = [xCoordinates[0]].concat(Array.from({ length: xCoordinates[1] - xCoordinates[0] }, (_, c) => xCoordinates[0] + c + 1))
        else coveringPoints[0] = [xCoordinates[0]].concat(Array.from({ length: xCoordinates[0] - xCoordinates[1] }, (_, c) => xCoordinates[0] - c - 1))
        if(yCoordinates[1] > yCoordinates[0]) coveringPoints[1] = [yCoordinates[0]].concat(Array.from({ length: yCoordinates[1] - yCoordinates[0] }, (_, c) => yCoordinates[0] + c + 1))
        else coveringPoints[1] = [yCoordinates[0]].concat(Array.from({ length: yCoordinates[0] - yCoordinates[1] }, (_, c) => yCoordinates[0] - c - 1))
        return coveringPoints.map(cords => cords.map((_, index) => [coveringPoints[0][index], coveringPoints[1][index]]))[0]
    }
}).flat(1).reduce((prev, cur) => (prev[cur.toString()] = prev[cur.toString()] + 1 || 1, prev), {}) // object, coordinates as the key and the value as the times that point was visited
console.log("Points where at least two lines do overlap:", Object.keys(points).filter(coord => points[coord] > 1).length)