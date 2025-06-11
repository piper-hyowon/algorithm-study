package main

import (
	"bufio"
	"fmt"
	"os"
)

// Go 의 map 은 key 가 중복 되지않음
var results = make(map[string]int)

func w(a, b, c int) int {
	// 이미 계산 결과가 있는지 확인
	key := fmt.Sprintf("%d,%d,%d", a, b, c)
	value, exists := results[key]
	if exists {
		return value
	}

	// 하나라도 0 이하면 1 리턴
	if a <= 0 || b <= 0 || c <= 0 {
		results[key] = 1

		return 1
	}

	// 하나라도 20보다 초과일 경우
	if a > 20 || b > 20 || c > 20 {
		result := w(20, 20, 20)
		results[key] = result

		return result
	}

	if a < b && b < c {
		result := w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c)
		results[key] = result

		return result
	}
	result := w(a-1, b, c) + w(a-1, b-1, c) + w(a-1, b, c-1) - w(a-1, b-1, c-1)
	results[key] = result

	return result
}

func main() {
	reader := bufio.NewReader((os.Stdin))
	writer := bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	for {
		var a, b, c int
		fmt.Fscanf(reader, "%d %d %d\n", &a, &b, &c)

		if a == -1 && b == -1 && c == -1 {
			break
		}

		result := w(a, b, c)
		fmt.Fprintf(writer, "w(%d, %d, %d) = %d\n", a, b, c, result)
	}

}
