function solution(today, terms, privacies) {
  let toDelete = [];
  const termsExpire = new Map();
  for (let t of terms) {
    const [term, month] = t.split(" ");
    termsExpire.set(term, +month);
  }

  const [todayYYYY, todayMM, todayDD] = today.split(".").map(Number);

  const isExpired = (expiryMonth, created) => {
    // creaeted + expiryMonth 랑 today 비교
    const [yyyy, mm, dd] = created.split(".").map(Number);

    // 보관가능날짜
    let expiryYYYY = yyyy;
    let expiryMM = mm + expiryMonth;
    let expiryDD = dd - 1;
    if (expiryDD < 1) {
      expiryDD = 28;
      expiryMM--;
    }

    if (expiryMM > 12) {
      const y = Math.floor(expiryMM / 12);
      expiryYYYY += y;
      expiryMM = expiryMM - y * 12;

      if (expiryMM === 0) {
        expiryMM = 12;
        expiryYYYY--;
      }
    }

    return (
      new Date(todayYYYY, todayMM - 1, todayDD) >
      new Date(expiryYYYY, expiryMM - 1, expiryDD)
    );
  };

  for (let i = 0; i < privacies.length; i++) {
    const [created, term] = privacies[i].split(" ");
    if (isExpired(termsExpire.get(term), created)) {
      toDelete.push(i + 1);
    }
  }

  return toDelete.sort((a, b) => a - b);
}

const cases = [
  [
    "2022.05.19",
    ["A 6", "B 12", "C 3"],
    ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"],
  ],
  [
    "2020.01.01",
    ["Z 3", "D 5"],
    [
      "2019.01.01 D",
      "2019.11.15 Z",
      "2019.08.02 D",
      "2019.07.01 D",
      "2018.12.28 Z",
    ],
  ],
  ["2019.12.09", ["A 12"], ["2018.12.10 A", "2010.10.10 A"]],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1], e[2]);
  console.log(r);
});
