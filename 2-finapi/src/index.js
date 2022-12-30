const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const costomers = [];

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

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const costumer = costomers.find((item) => item.cpf === cpf);

  if (!costumer) {
    return response.status(404).json({ error: "este usuario não existe" });
  }

  return response.json(costumer.statement);
});

app.listen(3333, () => {
  console.log("--- servidor rodando ----");
});
