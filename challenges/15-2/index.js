const { readFileSync } = require("fs")
const data = readFileSync("./input.txt").toString().trim()

function wrap(digit){
    let wrapped = 0
    for(let i = 0; i < digit; i++){
        wrapped += 1
        if(wrapped > 9) wrapped = 1
    }
    return wrapped
}

console.log("This solution is very slow! It requires >15 min to process, due to me being too lazy to implement an arbitrary dictionary.")
console.log("It needs to process every adjacent point for every point & do the path finding. Both operations take about as much time.\n")
let grid = data.split("\r\n").map(line => line.split("").map(Number)).map(line => new Array(5).fill(0).map((_, index) => line.map(val => wrap(val + index))).flat(1))
grid = new Array(5).fill(0).map((_, index) => grid.map(line => line.map(val => wrap(val + index)))).reduce((prev, cur) => prev.concat(cur))

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
graph.forEach((vertex, _, ar) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write("Processing adjacent mappings: " + _ + " / " + graph.length)
    vertex.adj = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([ax, ay]) => ar.find(item => item.x === vertex.x + ax && item.y === vertex.y + ay)).filter(v => v)
})

const start = graph.find(item => item.x === 0 && item.y === 0)
const end = graph.find(item => item.x === dimensions.width - 1 && item.y === dimensions.height - 1)

console.log("\nMoving on to path finding...\n")

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
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write("Path finding: " + queue.length + " / " + graph.length)
        const item = queue.shift()
        if(item === end) break // Done!
        for(const adj of item.adj){
            if(!queue.includes(adj)) continue
            const alt = distance[item.key] + adj.val
            if(alt < distance[adj.key]){
                distance[adj.key] = alt
                previous[adj.key] = item
                // Update
                for(let i = 0; i < queue.indexOf(adj); i++){
                    if(distance[adj.key] < distance[queue[i].key]){
                        queue.splice(queue.indexOf(adj), 1)
                        queue.splice(i, 0, adj)
                    }
                }
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

console.log("\nShortest path's combined risk:", algorithm(graph, start, end).slice(1).reduce((prev, cur) => (prev.val ?? prev) + cur.val))