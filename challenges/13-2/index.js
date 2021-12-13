const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
let grid = data.split("\r\n\r\n")[0].split("\r\n").map(line => line.split(",").map(Number))
const foldInstructions = data.split("\r\n\r\n")[1].split("\r\n").map(fold => fold.replace("fold along ", "").split("=").map(val => !(/x|y/g).test(val) ? parseInt(val) : val))
// Do the folds
for(let i = 0; i < foldInstructions.length; i++){
    const fold = foldInstructions[i]
    const coordIndex = fold[0] === "y" ? 1 : fold[0] === "x" ? 0 : null
    if(coordIndex === null) throw "Unknown fold type of \"" + fold[0] + "\"."
    grid.forEach(point => { if(fold[1] < point[coordIndex]) point[coordIndex] = point[coordIndex] - (Math.abs(fold[1] - point[coordIndex]) * 2) })
}
grid = grid.map(coord => coord.join(",")).filter((val, index, ar) => ar.indexOf(val) === index).map(val => val.split(",").map(Number)) // Remove duplicates
// Format output
const output = new Array(grid.map(coord => coord[1]).sort((a, b) => a - b).reverse()[0] + 1).fill(0) // Create the grid (y)
    .map((_, y) => grid.filter(coord => coord[1] === y).map(coord => coord[0]).sort((a, b) => a - b)) // Create the grid (x)
    .map(line => line.map((coord, index) => { // Convert to empty and filled spaces (0/1) from coordinates
        let before = line[index - 1] ?? (index === 0 ? - 1 : index)
        return coord - before !== 0 ? coord - before === 1 ? 1 : new Array(coord - before - 1).fill(0).concat([1]).flat(1) : 1
    }).flat(1))
// Render the output frame
const width = output.map(line => line.join("")).sort((a, b) => a.length - b.length).reverse()[0].length
const render = output.map(line => width - line.length !== 0 ? line.concat(new Array(width - line.length).fill(0)).flat(1) : line).map(line => line.map(coord => coord === 0 ? " " : "\x1b[42m \x1b[0m").join("")).join("\r\n")
console.log(render)