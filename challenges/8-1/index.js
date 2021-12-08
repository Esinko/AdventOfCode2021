const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString()
// Only output!
const entries_output = data.split("\r\n").map(line => line.split(" | ")[1].trim().split(" "))
let count = 0
for(const output of entries_output){
    console.log(output)
    for(const digit of output){
        switch(digit.length){
            case 2: {
                // A one
                ++count
                break
            }
            case 4: {
                // A four
                ++count
                break
            }
            case 3: {
                // A seven
                ++count
                break
            }
            case 7: {
                // An eight
                ++count
                break
            }
        }
    }
}
console.log("Digits 1,4,7 and 8 appear", count, "times.")