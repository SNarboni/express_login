const tab = [1, 0, 0, 0, 1, 1, 0, 0, 1];
const tab2 = [0, 0, 0];

function findO() {
  let newTab = [...tab, 1];
  let count = 0;
  let somme = 0;
  for (let i = 0; i < tab.length - 1; i++) {
    if (tab[i] === 0) {
      count++;
      if (tab[i + 1] === 1) {
        myTranche.push(count);
        somme += totalEntier(count);
      }
    } else if (tab[i] === 1) {
      count = 0;
    }
  }
}

const n = 3;

function totalEntier(n) {
  let somme = 0;
  for (let i = 0; i <= n; i++) {
    somme += i;
  }
  return somme;
}

find0();

function getAge(date) {
  var diff = Date.now() - date.getTime();
  var age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}

console.log(getAge(new Date(1601510400000)));
