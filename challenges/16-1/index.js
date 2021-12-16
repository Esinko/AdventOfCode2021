const { readFileSync } = require("fs")
const lines = readFileSync("./input.txt").toString().trim().split("\r\n")
const hexTable = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}
function parsePacket(packet){
    const version = parseInt(packet.splice(0, 3).join(""), 2)
    const typeID = parseInt(packet.splice(0, 3).join(""), 2)
    let sum = 0
    sum += version
    switch(typeID){
        case 4: { // Only literal
            let literal = []
            let length = 0
            for(const byte of packet.join("").match(/.{1,5}/g)){
                length += byte.length
                literal.push(byte.substr(1))
                if(byte[0] === "0") break
            }
            literal = parseInt(literal.join(""), 2)
            packet.splice(0, length)
            break
        }
        default:
            // Operator
            const lengthTypeID = parseInt(packet.splice(0, 1).join(""), 2)
            switch(lengthTypeID){
                case 0: {
                    // 15-bit field - Total length
                    const totalLength = parseInt(packet.splice(0, 15).join(""), 2)
                    let section = packet.splice(0, totalLength)
                    while(section.length){
                        const parsed = parsePacket(section)
                        section = parsed.out
                        sum += parsed.sum
                    }
                    break
                }
                case 1: {
                    // 11-bit field
                    const numberOfPackets = parseInt(packet.splice(0, 11).join(""), 2)
                    for(let i = 0; i < numberOfPackets; i++){
                        const parsed = parsePacket(packet)
                        packet = parsed.out
                        sum += parsed.sum
                    }
                    break
                }
                default: {
                    throw "Unknown sub-packet length"
                }
            }
    }
    return { out: packet, sum }
}
let totalSum = 0
for(const line of lines){
    const packet = line.split("").map(char => hexTable[char]).join("").split("")
    const parsed = parsePacket(packet)
    totalSum += parsed.sum
}
console.log("Sum", totalSum)