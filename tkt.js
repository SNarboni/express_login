const { parsePath } = require("history");

let myBirth = "2020,10,09";

function getAge(date) {
  var diff = Date.now() - date.getTime();
  var age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}
console.log(getAge(new Date(1995, 12, 6)));
console.log(parsePath(myBirth));
