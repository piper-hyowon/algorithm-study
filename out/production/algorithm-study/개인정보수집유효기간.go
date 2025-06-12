package main

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func main() {
	cases := [][][]string{
		{
			{"2022.05.19"},
			{"A 6", "B 12", "C 3"},
			{"2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"},
		},
		{
			{"2020.01.01"},
			{"Z 3", "D 5"},
			{"2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"},
		},
		{
			{"2019.12.09"},
			{"A 12"},
			{"2018.12.10 A", "2010.10.10 A"},
		},
	}

	for _, v := range cases {
		r := solution(v[0][0], v[1], v[2])
		fmt.Println(r)
	}

}

func solution(today string, terms []string, privacies []string) []int {
	var toDel []int
	tMap := make(map[string]int)
	for _, t := range terms {
		s := strings.Split(t, " ")
		m, _ := strconv.Atoi(s[1])
		tMap[s[0]] = m
	}

	// today
	s := strings.Split(today, ".")
	tdyY, _ := strconv.Atoi(s[0])
	tdyM, _ := strconv.Atoi(s[1])
	tdyD, _ := strconv.Atoi(s[2])

	for i, p := range privacies {
		s = strings.Split(p, " ")
		createdAt, term := s[0], s[1]
		s = strings.Split(createdAt, ".")
		expY, _ := strconv.Atoi(s[0])
		expM, _ := strconv.Atoi(s[1])
		expM += tMap[term]
		expD, _ := strconv.Atoi(s[2])
		expD--

		if expD < 1 {
			expD = 28
			expM--
		}

		for expM > 12 {
			expM -= 12
			expY++
		}

		if expM < 1 {
			expM = 12
			expY--
		}

		isExpired := false
		if tdyY > expY {
			isExpired = true
		} else if tdyY == expY {
			if tdyM > expM {
				isExpired = true
			} else if tdyM == expM {
				if tdyD > expD {
					isExpired = true
				}
			}
		}

		if isExpired {
			toDel = append(toDel, i+1)
		}
	}

	sort.Ints(toDel)

	return toDel
}
