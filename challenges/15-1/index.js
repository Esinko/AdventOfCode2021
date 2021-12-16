const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()
const grid = data.split("\r\n").map(line => line.split("").map(Number))
// Implement Dijkstra's algorithm
const dimensions = {
    height: grid.length,
    width: grid[0].length
}
const graph = grid.map((_, y) => _.map((val, x) => (
    { 
        val,
        x,
        y,
        key: x + "," + y
    }
))).flat(1)
graph.forEach((vertex, _, ar) => vertex.adj = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([ax, ay]) => ar.find(item => item.x === vertex.x + ax && item.y === vertex.y + ay)).filter(v => v))
const start = graph.find(item => item.x === 0 && item.y === 0)
const end = graph.find(item => item.x === dimensions.width - 1 && item.y === dimensions.height - 1)
function algorithm(graph, start, end){
    const distance = {}
    const previous = {}
    const queue = []
    for(const vertex of graph) {
        distance[vertex.key] = Infinity
        queue.push(vertex)
    }
    distance[start.key] = 0
    // Loop until "the set" is not empty
    while(queue.length !== 0){
        // Lowest
        let lowest = Infinity
        let lowestItem = null
        let lowestIndex = -1
        for(let i = 0; i < queue.length; i++){
            const item = queue[i]
            if(lowest > distance[item.key]){
                lowestItem = item
                lowest = distance[item.key]
                lowestIndex = i
            }
        }
        queue.splice(lowestIndex, 1)
        if(lowestItem === end) break // Done!
        for(const adj of lowestItem.adj){
            if(!queue.includes(adj)) continue
            const alt = distance[lowestItem.key] + adj.val
            if(alt < distance[adj.key]){
                distance[adj.key] = alt
                previous[adj.key] = lowestItem
            }
        }
    }
    const path = [end]
    let current = end.key
    while(current != start.key){
        path.unshift(previous[current])
        current = previous[current].key
    }
    return path
}

console.log("Shortest path's combined risk:", algorithm(graph, start, end).slice(1).reduce((prev, cur) => (prev.val ?? prev) + cur.val))