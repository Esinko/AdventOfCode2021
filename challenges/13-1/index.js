const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
let grid = data.split("\r\n\r\n")[0].split("\r\n").map(line => line.split(",").map(Number))
const foldInstructions = data.split("\r\n\r\n")[1].split("\r\n").map(fold => fold.replace("fold along ", "").split("=").map(val => !(/x|y/g).test(val) ? parseInt(val) : val))
const folds = 1
for(let i = 0; i < folds; i++){
    const fold = foldInstructions[i]
    const coordIndex = fold[0] === "y" ? 1 : fold[0] === "x" ? 0 : null
    if(coordIndex === null) throw "Unknown fold type of \"" + fold[0] + "\"."
    grid.forEach(point => { if(fold[1] < point[coordIndex]) point[coordIndex] = point[coordIndex] - (Math.abs(fold[1] - point[coordIndex]) * 2) })
}
grid = grid.map(coord => coord.join(",")).filter((val, index, ar) => ar.indexOf(val) === index).map(val => val.split(",").map(Number))
console.log("Visible points", new Array(grid.map(coord => coord[1]).sort((a, b) => a - b).reverse()[0] + 1).fill(0).map((_, index) => grid.filter(coord => coord[1] === index)).map(line => line.filter((val, index, ar) => ar.indexOf(val) === index)).flat(1).length)