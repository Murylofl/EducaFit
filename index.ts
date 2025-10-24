const express = require("express");
const { db } = require("./db");
const server = express();

server.use(express.json());

server.get("/alunos", async (req, res) => {
  const alunos = await db.aluno.findMany();
  res.json(alunos);
});

server.post("/alunos", async (req, res) => {
  const {
    nome,
    sobrenome,
    data_de_nascimento,
    email,
    telefone,
    matricula_do_aluno,
  } = req.body;
  await db.aluno.create({
    data: {
      nome,
      sobrenome,
      data_de_nascimento,
      email,
      telefone,
      matricula_do_aluno,
    },
  });

  res.json({ mensagem: "ok" });
});
server.listen(3001, () => console.log("Rodando"));

server.delete("/alunos/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.aluno.delete({
    where: { id },
  });
});
server.update("/alunos/id", async (req, res) => {
  await db.aluno.update({
    where: { id: req.params.id },
    email: "",
    telefone: "",
  });
});
