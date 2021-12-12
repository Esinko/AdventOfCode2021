const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const lines = data.split("\r\n").map(connection => connection.split("-"))
const caveSystem = {}
lines.map(connection => {
    if(!caveSystem[connection[0]]) caveSystem[connection[0]] = [connection[1]]
    else caveSystem[connection[0]].push(connection[1])
    if(!caveSystem[connection[1]]) caveSystem[connection[1]] = [connection[0]]
    else caveSystem[connection[1]].push(connection[0])
})
let paths = []
function traverse(location, visitedCaves = []){ // Path finding goodness
    const connections = caveSystem[location]
    visitedCaves = visitedCaves.slice(0)
    visitedCaves.push(location)
    let madeVisits = 0
    for(const connection of connections){
        if(connection === "start") continue
        if(connection === "end") continue
        if(!(/[A-Z]/g).test(connection)){
            // Small cave
            let twoVisited = visitedCaves.filter(cave => !(/[A-Z]/g).test(cave)).filter((cave, index, ar) => ar.indexOf(cave) !== index).length != 0
            if(visitedCaves.includes(connection) && twoVisited) continue
            ++madeVisits
            const visits = traverse(connection, visitedCaves)
            madeVisits += visits > 0 ? visits : 1
        }else {
            // Big cave
            const visits = traverse(connection, visitedCaves)
            madeVisits += visits > 0 ? visits : 1
        }
    }
    if(madeVisits === 0 && connections.includes("end")){
        visitedCaves.push("end")
        paths.push(visitedCaves)
    }else if(connections.includes("end")){
        visitedCaves.push("end")
        paths.push(visitedCaves)
    }
    return madeVisits
}
traverse("start")
console.log("Paths through the cave:", paths.length)