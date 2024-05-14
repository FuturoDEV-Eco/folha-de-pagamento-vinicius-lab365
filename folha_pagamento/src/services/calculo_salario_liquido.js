function calcularSalarioLiquido(salarioBruto, inss, irrf, outros = 0.0) {
  return salarioBruto - (inss + irrf + outros);
}

// console.log(calcularSalarioLiquido(2400, 197.82, 22.36, 150));
