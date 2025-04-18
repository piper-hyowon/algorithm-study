javascript;
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
