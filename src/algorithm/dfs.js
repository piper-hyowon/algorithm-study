// 인접 리스트로 표현된 그래프
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

// 재귀를 이용한 DFS
function dfsRecursive(graph, start, visited = new Set()) {
  console.log(start); // 현재 노드 방문
  visited.add(start);

  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// 스택을 이용한 DFS
function dfsIterative(graph, start) {
  const stack = [start];
  const visited = new Set();

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      console.log(vertex); // 현재 노드 방문
      visited.add(vertex);

      // 인접 노드들을 스택에 추가 (역순으로 추가하면 그래프 순서대로 방문)
      for (const neighbor of [...graph[vertex]].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}

console.log("DFS 재귀:");
dfsRecursive(graph, "A");
console.log("\nDFS 반복:");
dfsIterative(graph, "A");
