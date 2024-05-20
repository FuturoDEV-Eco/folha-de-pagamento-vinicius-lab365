function calcularIRRF(salarioBruto, inss) {
  let baseCalculo = salarioBruto - inss;

  let valorIR;

  if (baseCalculo <= 2112.0) {
    valorIR = 0.0;
  } else if (baseCalculo <= 2826.65) {
    valorIR = baseCalculo * 0.075 - 142.8;
  } else if (baseCalculo <= 3751.05) {
    valorIR = baseCalculo * 0.15 - 354.8;
  } else if (baseCalculo <= 4664.68) {
    valorIR = baseCalculo * 0.225 - 636.13;
  } else {
    valorIR = baseCalculo * 0.275 - 869.36;
  }

  return valorIR;
}

// console.log(calcularIRRF(2400, 197.82));

module.exports = calcularIRRF;
