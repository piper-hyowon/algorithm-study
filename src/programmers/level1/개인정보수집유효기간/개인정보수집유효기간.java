import java.util.Arrays;
import java.util.HashMap;
import java.util.ArrayList;

class 개인정보수집유효기간 {
  public static void main(String[] args) {
    String[][][] cases = { // strin -> String
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
        {"2019.12.09"}, {"A 12"}, {"2018.12.10 A", "2010.10.10 A"},
      },
    };

    Solution sol = new Solution();
    for (String[][] c : cases) {
      int[] answer = sol.solution(c[0][0], c[1], c[2]);
      System.out.println(Arrays.toString(answer) + "\n");
    }
  }
}

class Solution {
  public int[] solution(String today, String[] terms, String[] privacies) {
    ArrayList<Integer> toDelete = new ArrayList<>();
    HashMap<Character, Integer> tMap = new HashMap<>();

    for (String t : terms) {
      String[] parts = t.split(" ");
      tMap.put(parts[0].charAt(0), Integer.parseInt(parts[1]));
    }

    String[] s = today.split("\\."); // java는 split(regex), go/javascript 는 리터럴문자열
    int tdyY = Integer.parseInt(s[0]);
    int tdyM = Integer.parseInt(s[1]);
    int tdyD = Integer.parseInt(s[2]);
    
    for (int i = 0; i < privacies.length; i ++) {
      s = privacies[i].split(" ");
      Character term = s[1].charAt(0);
      s = s[0].split("\\.");
      int expY = Integer.parseInt(s[0]);
      int expM = Integer.parseInt(s[1]);
      expM += tMap.get(term);
      int expD = Integer.parseInt(s[2]);
      expD--;

      if (expD < 1) {
        expD = 28;
        expM--;
      }

        if (expM > 12) {
                expY += (expM - 1) / 12;
                expM = (expM - 1) % 12 + 1;
            }

      if (expM < 1) {
        expM = 12;
        expY--;
      }

      boolean isExpired = false;
      if (tdyY > expY) {
        isExpired = true;
      } else if (tdyY == expY) {
        if (tdyM > expM) {
          isExpired = true;
        } else if (tdyM == expM) {
          if (tdyD > expD) {
            isExpired = true;
          }
        }
      }

      if (isExpired) {
        toDelete.add(i+1);
      }


    }


      int[] result = toDelete.stream().mapToInt(a -> a).toArray();
      Arrays.sort(result);
      return result;
}
}
