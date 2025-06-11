function findShortestPath(graph, start, end) {
  if (start === end) return [start];

  const queue = [[start]]; // 경로를 저장하는 큐
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const vertex = path[path.length - 1]; // 현재 경로의 마지막 노드

    for (const neighbor of graph[vertex]) {
      if (neighbor === end) {
        return [...path, neighbor]; // 목적지 도달
      }

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]); // 새 경로 추가
      }
    }
  }

  return null; // 경로가 없는 경우
}

console.log("A에서 F까지의 최단 경로:");
console.log(findShortestPath(graph, "A", "F")); // ['A', 'C', 'F']
