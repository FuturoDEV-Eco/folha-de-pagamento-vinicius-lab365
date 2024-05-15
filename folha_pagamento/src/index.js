const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
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
      input.question(
        "Digite o valor de outros descontos (0 se não houver): R$ ",
        (outrosDescontos) => {
          salarioBruto = parseFloat(salarioBruto);
          outrosDescontos = parseFloat(outrosDescontos);
          const valorINSS = calcularINSS(salarioBruto);
          const valorIR = calcularIRRF(salarioBruto, valorINSS);
          const salarioLiquido = calcularSalarioLiquido(
            salarioBruto,
            valorINSS,
            valorIR,
            outrosDescontos
          );

          console.log();

          console.log("--- Folha de pagamento ---");
          console.log(`Nome: ${nome}`);
          console.log(`CPF: ${cpf}`);
          console.log(`Salário Bruto: R$ ${salarioBruto.toFixed(2)}`);
          console.log(`INSS: R$ ${valorINSS.toFixed(2)}`);
          console.log(`IRRF: R$ ${valorIR.toFixed(2)}`);
          console.log(`Outros Descontos: R$ ${outrosDescontos.toFixed(2)}`);
          console.log(`Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`);

          console.log();

          input.question(
            "Deseja gerar um PDF com a folha de pagamento? (s/n) ",
            (resposta) => {
              if (resposta.toLowerCase() === "s") {
                const pasta = path.join(__dirname, "folhas_pagamento");
                if (!fs.existsSync(pasta)) {
                  fs.mkdirSync(pasta);
                }

                const filePath = path.join(
                  pasta,
                  `folha_de_pagamento_${nome.replace(/\s+/g, "_")}.pdf`
                );

                const dataGeracao = new Date().toLocaleDateString("pt-BR");

                const doc = new PDFDocument();
                doc.pipe(fs.createWriteStream(filePath));

                doc.fontSize(18).text("--- Folha de pagamento ---");

                doc.moveDown();
                doc.text(`Data de Geração: ${dataGeracao}`);
                doc.text(`Nome: ${nome}`);
                doc.text(`CPF: ${cpf}`);
                doc.text("--- ---");
                doc.text(`Salário Bruto: R$ ${salarioBruto.toFixed(2)}`);
                doc.text("--- ---");
                doc.text(`INSS: R$ ${valorINSS.toFixed(2)}`);
                doc.text(`IRRF: R$ ${valorIR.toFixed(2)}`);
                doc.text(`Outros Descontos: R$ ${outrosDescontos.toFixed(2)}`);
                doc.text("--- ---");
                doc.text(`Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`);
                doc.moveDown();

                doc.end();

                console.log();

                console.log(`PDF gerado em: ${filePath}`);
              } else {
                console.log("PDF não será gerado.");
              }
              input.close();
            }
          );
        }
      );
    });
  });
});
