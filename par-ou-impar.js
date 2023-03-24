const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const parOuImpar = process.argv[2];

const devNumber = +process.argv[3];

const soma = getRndInteger(0, 5) + devNumber;

if (soma % 2 === 0) {
  console.log(`Você escolheu ${parOuImpar}, e a soma deu ${soma}, então...`);
  if (parOuImpar == "par") {
    console.log(`Você ganhou!!!`);
  } else {
    console.log(`Você perdeu :(`);
  }
} else {
  console.log(`Você escolheu ${parOuImpar}, e a soma deu ${soma}, então...`);
  if (parOuImpar == "par") {
    console.log(`Você perdeu  :(`);
  } else {
    console.log(`Você ganhou!!!`);
  }
}
