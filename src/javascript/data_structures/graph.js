class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    // 무방향 그래프 (방향 그래프는 한 쪽만 추가)
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // 깊이 우선 탐색 (재귀)
  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);

      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(start);

    return result;
  }

  // 깊이 우선 탐색 (반복)
  depthFirstIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (stack.length) {
      const currentVertex = stack.pop();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }

    return result;
  }

  // 너비 우선 탐색
  breadthFirst(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

// 인접 행렬을 사용한 그래프
class GraphMatrix {
  constructor(size) {
    this.matrix = [];
    this.vertices = [];
    // 2차원 행렬 초기화
    for (let i = 0; i < size; i++) {
      this.matrix.push(new Array(size).fill(0));
    }
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }

  addEdge(vertex1, vertex2, weight = 1) {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 >= 0 && index2 >= 0) {
      this.matrix[index1][index2] = weight;
      this.matrix[index2][index1] = weight; // 무방향 그래프
    }
  }

  removeEdge(vertex1, vertex2) {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 >= 0 && index2 >= 0) {
      this.matrix[index1][index2] = 0;
      this.matrix[index2][index1] = 0;
    }
  }

  getNeighbors(vertex) {
    const index = this.vertices.indexOf(vertex);
    const neighbors = [];

    if (index >= 0) {
      for (let i = 0; i < this.matrix[index].length; i++) {
        if (this.matrix[index][i] !== 0) {
          neighbors.push(this.vertices[i]);
        }
      }
    }

    return neighbors;
  }
}
