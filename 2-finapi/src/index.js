const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const costomers = [];

function verifyIfExistsAccountCPF(request, response, next){
  const { cpf } = request.headers;
  const costumer = costomers.find((item) => item.cpf === cpf);

  if (!costumer) {
    return response.status(400).json({ error: "este usuario não existe" });
  }

  request.customer = costumer;

  return next();
}

function getBalance(statement){
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === "credit"){
      return acc + operation.amount;
    }else{
      return acc - operation.amount;
    }
  }, 0)
  return balance;
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const costomersAlreadyExists = costomers.some(
    (costumer) => costumer.cpf === cpf
  );

  if (costomersAlreadyExists) {
    return response.status(403).send({
      message: "Esse cpf já foi cadastrado",
    });
  }

  const persona = {
    name,
    cpf,
    id: uuidv4(),
    statement: [],
  };
  costomers.push(persona);
  console.log(persona);

  return response.status(201).send(persona);
});

// app.use(verifyIfExistsAccountCPF);

app.get("/statement", verifyIfExistsAccountCPF,(request, response) => {
  const { customer } = request;
  
  return response.json(customer.statement);
});


app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    create_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(balance < amount){
    return response.status(403).json({
      erro: "Saldo insuficiente!"
    })
  }

  const statementOperation = {
    amount,
    create_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send()


})

app.listen(3001, () => {
  console.log("--- servidor rodando na 3001 ----");
});
