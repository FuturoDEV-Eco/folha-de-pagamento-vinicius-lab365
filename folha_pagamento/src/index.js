const calcularINSS = require("./services/calculo_inss");
const calcularIRRF = require("./services/calculo_imposto_renda");
const calcularSalarioLiquido = require("./services/calculo_salario_liquido");

const readline = require("readline");

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("Digite o nome do funcionário: ", (nome) => {
  input.question("Digite o CPF do funcionário: ", (cpf) => {
    input.question("Digite o valor do salário bruto: R$ ", (salarioBruto) => {
      salarioBruto = parseFloat(salarioBruto);
      const valorINSS = calcularINSS(salarioBruto);
      const valorIR = calcularIRRF(salarioBruto, valorINSS);
      const salarioLiquido = calcularSalarioLiquido(
        salarioBruto,
        valorINSS,
        valorIR
      );

      console.log();

      console.log("--- Folha de pagamento ---");
      console.log(`Nome: ${nome}`);
      console.log(`CPF: ${cpf}`);
      console.log(`Salário Bruto: R$ ${salarioBruto.toFixed(2)}`);
      console.log(`INSS: R$ ${valorINSS.toFixed(2)}`);
      console.log(`IRRF: R$ ${valorIR.toFixed(2)}`);
      console.log(`Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`);
      input.close();
    });
  });
});
