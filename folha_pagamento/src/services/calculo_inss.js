function calcularINSS(salarioBruto) {
  const tetoINSS = 908.85;

  let valorINSS = 0;

  if (salarioBruto <= 1412.0) {
    valorINSS = salarioBruto * 0.075;
  } else if (salarioBruto <= 2666.68) {
    valorINSS = salarioBruto * 0.09 - 18.18;
  } else if (salarioBruto <= 4000.03) {
    valorINSS = salarioBruto * 0.12 - 91.0;
  } else if (salarioBruto <= 7786.02) {
    valorINSS = salarioBruto * 0.14 - 163.83;
  } else {
    valorINSS = tetoINSS;
  }

  return valorINSS;
}

// console.log(calcularINSS(2400));

module.exports = calcularINSS;
