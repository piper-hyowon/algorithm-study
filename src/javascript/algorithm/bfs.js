function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const vertex = queue.shift(); // 큐에서 첫 번째 요소 제거
    console.log(vertex); // 현재 노드 방문

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

console.log("BFS:");
bfs(graph, "A");
