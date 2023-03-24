const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const devChoise = process.argv[2];
console.log(`Você escolheu ${devChoise}`);

const getComputerChoise = () => {
  const randomNumber = getRndInteger(1, 3);
  //console.log(randomNumber);
  switch (randomNumber) {
    case 1:
      return "pedra";
    case 2:
      return "papel";
    case 3:
      return "tesoura";
    default:
      return "pedra";
  }
};

const computerChoise = getComputerChoise();
console.log(`O computador escolheu ${computerChoise}`);

let result;

if (
  (computerChoise === "pedra" && devChoise === "pedra") ||
  (computerChoise === "papel" && devChoise === "papel") ||
  (computerChoise === "tesoura" && devChoise === "tesoura")
) {
  result = "Empatou";
  console.log(result);
} else if (
  (computerChoise === "pedra" && devChoise === "papel") ||
  (computerChoise === "papel" && devChoise === "tesoura") ||
  (computerChoise === "tesoura" && devChoise === "pedra")
) {
  result = "Parabéns!!! Você ganhou !!!!!";
  console.log(result);
} else if (
  (computerChoise === "pedra" && devChoise === "tesoura") ||
  (computerChoise === "papel" && devChoise === "pedra") ||
  (computerChoise === "tesoura" && devChoise === "papel")
) {
  result = "Você perdeu :(";
  console.log(result);
} else {
  result = 'O argumento deve ser "pedra" "papel" ou "tesoura"';
  console.log(result);
}

//console.log(result);
