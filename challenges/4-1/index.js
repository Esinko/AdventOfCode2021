const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().split("\n")
// Get the list of Bingo numbers to draw
const numberList = data[0].trim().split(",")
data.splice(0, 2)
// Build list of bingo boards, like this:
// [
//      [
//          [ "1", "9", "5", "3", "5"],
//          [ "3", "5", "9", "4", "1"]
//          ... (up to 5 rows per board)
//      ],
//      ...
// ]
let boards = data.join("\n").trim().split("\r\n\r\n").map(board => board.split("\r\n").map(row => row.split(/ +/).filter(val => val !== "")))
// Draw numbers in order from the number list
for(const number of numberList){
    // Change the type of all the occurrences of the drawn Bingo number in the Bingo boards to type "number"
    boards = boards.map(board => board.map(row => row.map(val => val === number ? parseInt(val) : val)))
    // Find all rows with only numbers in them
    const rowWinners = boards.filter(board => board.some(row => row.every(val => typeof val === "number")))
    // Find all columns with only numbers in them
    const columnWinners = boards.filter(board => board.some((_, columnIndex) => board.map(row => row[columnIndex]).every(val => typeof val === "number")))
    // Report the winner, if present
    const winners = columnWinners ?? rowWinners
    if(winners.length > 0){
        const score = winners[0].map(row => row.map(val => typeof val === "string" ? parseInt(val) : 0)).map(row => row.reduce((prev, val) => prev + val)).reduce((prev, cur) => prev + cur) * number
        console.log("Final score:", score)
        break
    }
}