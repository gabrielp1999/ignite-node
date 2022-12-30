const express = require("express");

const app = express();

app.use(express.json());

// Router params => identificar um recurso  editar/deletar/buscar
// Query params => paginação / filtro
// Body params => os objetos inserção/alteração (JSON)

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query);
  return response.json(["curso 1", "curso 2", "curso 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["curso 1", "curso 2", "curso 3", "curso 4"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json(["curso 6", "curso 2", "curso 3"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["curso 6", "curso 7", "curso 3"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["curso 6", "curso 7"]);
});

app.listen(3001, () => {
  console.log("--- servidor rodando ---");
});
