const [N, B] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ");

process.stdout.write(parseInt(N, B) + "");
