package main

import (
	"bufio"
	"fmt"
	"os"
)

// 상근이 친구와 친구의 친구만 초대
// 상근이(1번)로부터 거리가 1인 노드나 2인 노드만 찾아
// -> BFS . 시작점으로부터 최단거리 계산

func main() {
	reader := bufio.NewReader((os.Stdin))
	writer := bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	var n, m int
	// n: 상근이 포함 동기 수 (번호1부터 n까지)
	// m: 친구 관계 수
	fmt.Fscan(reader, &n, &m)

	// 그래프 생성 - 각 사람의 친구 목록 저장하는 2차원 슬라이스
	graph := make([][]int, n+1) // 크기가 n+1인 이유 -> 사람 번호가 1부터 시작해서. 인덱스를 실제 사람 번호와 일치시킴 . 0번인덱스는 사용  X
	// 기본적으로 nil 슬라이스로 초기화됨. append() 사용시 자동으로 새 슬라이스를 생성함
	// fmt.Fprintln(writer, graph)

	// 간선 정보 입력
	for i := 0; i < m; i++ {
		var a, b int // 친구관계 두 사람 번호
		fmt.Fscan(reader, &a, &b)
		// 양방향 그래프
		graph[a] = append(graph[a], b)
		graph[b] = append(graph[b], a)
	}
	// fmt.Fprintln(writer, graph)

	// BFS 준비
	visited := make([]bool, n+1) // 각 사람을 방문했는지 (똑같이 사람 번호==인덱스)
	distance := make([]int, n+1) // 거리 (거리가 1아니면 2까지만 초대)
	queue := []int{1}            // BFS에 사용할 큐 (상근이 부터 시작)
	visited[1] = true            // 상근이 방문 표시

	for len(queue) > 0 {
		// fmt.Println(queue)
		// fmt.Fprintf(writer, "queue: %d", queue)

		current := queue[0] // 큐에서 하나 꺼냄
		queue = queue[1:]   // 큐 업데이트 (맨 앞 요소 제거) 꺼냈으니까!

		for _, friendNumber := range graph[current] { // 현재 사람의 모든 친구를 확인
			// fmt.Fprintf(writer, "friendNumber: %d", friendNumber)

			if !visited[friendNumber] { // 아직 방문하지 않은 친구라면
				visited[friendNumber] = true                   // 방문 표시
				distance[friendNumber] = distance[current] + 1 // 거리 계산 (친구니까 +1!!! )
				queue = append(queue, friendNumber)            // 큐에 추가
				// fmt.Fprintf(writer, "  사람 %d 방문 표시, 거리 = %d, 큐에 추가\n", friendNumber, distance[friendNumber])
			}
			// else {
			// 	fmt.Fprintf(writer, "  사람 %d는 이미 방문함\n", friendNumber)
			// }
		}

	}

	// 초대할 사람 수 계산 (친구와 친구의 친구만 초대)
	count := 0
	// fmt.Fprintln(writer, "\n초대할 사람들:")

	for i := 2; i <= n; i++ { // 1번(상근)을 제외하고 계산
		if visited[i] && distance[i] <= 2 { // 거리가 1 또는 2인 경우만 카운트
			count++
			// fmt.Fprintf(writer, "사람 %d: 거리=%d, 초대함\n", i, distance[i])
		} else {
			if visited[i] {
				// fmt.Fprintf(writer, "사람 %d: 거리=%d, 초대하지 않음 (거리가 2보다 큼)\n", i, distance[i])
			} else {
				// fmt.Fprintf(writer, "사람 %d: 방문하지 않음, 초대하지 않음\n", i)
			}
		}
	}

	fmt.Fprintln(writer, count)
}
