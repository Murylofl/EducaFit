const express = require("express");
const { db } = require("./db");
const server = express();

server.use(express.json());

server.get("/alunos", async (req, res) => {
  const alunos = await db.aluno.findMany();
  res.json(alunos);
});
server.post("/login/:matricula/:senha:", async (req, res) => {
  const alunos = await db.aluno.find({
    where: { matricula: req.body.matricula, senha: req.body.matricula },
    res.status(200).end(),
  });
});
server.post("/alunos", async (req, res) => {
  const {
    nomeCompleto,
    dataDeNascimento,
    eMail,
    telefone,
    frequencia,
    matricula,
    senha,
  } = req.body;
  await db.aluno.create({
    data: {
      nomeCompleto,
      dataDeNascimento,
      eMail,
      telefone,
      frequencia,
      matricula,
      senha,
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
