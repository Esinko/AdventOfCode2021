const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
let map = new Array(9).fill(0)
data.split(",").map(val => parseInt(val)).map(val => map[val] += 1)
const daysToSimulate = 256
for(let i = 1; i < daysToSimulate + 1; i++) {
    const iMap = new Array(9).fill(0)
    let count = 0
    for(let i = 0; i < map.length; i++){
        if(i === 0) {
            iMap[8] = map[i]
            count = map[i]
        }else iMap[i - 1] = map[i]
    }
    iMap[6] += count
    map = iMap
}
console.log("Lanternfish after", daysToSimulate, "days:", map.reduce((count, fish) => count + fish, 0))