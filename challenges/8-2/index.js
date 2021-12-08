const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString()
const lines = data.split("\r\n")
const entries = lines.map(line => ({ input: line.split(" | ")[0].trim().split(" ").map(digit => digit.split("")), output: line.split(" | ")[1].trim().split(" ").map(digit => digit.split("")) }))
let total = 0
for(const entry of entries){
    let digit_map = []
    const wire_map = {}
    // -- Find the static digits ---
    for(const digit of entry.input){
        switch(digit.length){
            case 2: {
                digit_map[1] = digit
                break
            }
            case 4: {
                digit_map[4] = digit
                break
            }
            case 3: {
                digit_map[7] = digit
                break
            }
            case 7: {
                digit_map[8] = digit
                break
            }
        }
    }
    // -- Figure out the wires with the known digits ---
    // Find A
    wire_map.a = digit_map[7].filter(wire => !digit_map[1].includes(wire)).join(""),
    // Find G
    digit_map[9] = entry.input.filter(digit => digit.length === 6).filter(digit => digit.includes(wire_map.a)).filter(digit => digit_map[4].every(v => digit.includes(v)))[0]
    wire_map.g = digit_map[9].filter(wire => wire !== wire_map.a).filter(wire => !digit_map[4].includes(wire))[0]
    // Find E
    wire_map.e = digit_map[8].filter(wire => !digit_map[4].includes(wire)).filter(wire => wire !== wire_map.a).filter(wire => wire !== wire_map.g)[0]
    // Find B
    digit_map[3] = entry.input.filter(list => list.length === 5).filter(list => list.includes(digit_map[1][0]) && list.includes(digit_map[1][1]))[0]
    wire_map.b = digit_map[8].filter(wire => !digit_map[3].includes(wire)).filter(wire => wire !== wire_map.e)[0]
    // Find D
    digit_map[0] = entry.input.filter(list => list.length === 6).filter(list => list.includes(wire_map.e)).filter(list => list.includes(digit_map[1][0]) && list.includes(digit_map[1][1]))[0]
    wire_map.d = digit_map[8].filter(wire => !digit_map[0].includes(wire))[0]
    // Find C
    digit_map[6] = entry.input.filter(list => list.length === 6).filter(list => list.join("") !== digit_map[9].join("") && list.join("") !== digit_map[0].join(""))[0]
    wire_map.c = digit_map[8].filter(wire => !digit_map[6].includes(wire))[0]
    // Find F
    digit_map[2] = entry.input.filter(list => list.length === 5).filter(list => list.join("") !== digit_map[3].join("")).filter(list => list.includes(wire_map.c))[0]
    wire_map.f = digit_map[8].filter(wire => !digit_map[2].includes(wire)).filter(wire => wire !== wire_map.b)[0]
    digit_map[5] = digit_map[8].filter(wire => wire !== wire_map.c && wire !== wire_map.e)
    
    // --- Get the number ---
    let numbers = entry.output.map(output => digit_map.indexOf(digit_map.filter(input => input.every(number => output.includes(number) && input.length == output.length))[0]))
    total += parseInt(numbers.join(""))
}
console.log("Total", total)