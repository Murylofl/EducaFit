import express from "express";
import { db } from "./db";

const server = express();

server.use(express.json());

server.get("/alunos", async (req, res) => {
  const alunos = await db.aluno.findMany();
  res.json(alunos);
});
server.post("/login/:matricula/:senha:", async (req, res) => {
  const alunos = await db.aluno.find({
    where: { matricula: req.body.matricula, senha: req.body.matricula },
  });
  res.status(200);
});
server.post("/alunos", async (req, res) => {
  const {
    alunoNome,
    alunoData,
    alunoEmail,
    alunoTelefone,
    alunoMatricula,
    alunoSenha,
  } = req.body;
  const aluno = await db.aluno.create({
    data: JSON.stringify({
      nomeCompleto: alunoNome,
      dataDeNasciment: alunoData,
      eMail: alunoEmail,
      telefone: alunoTelefone,
      frequencia: false,
      matricula: alunoMatricula,
      senha: alunoSenha,
    }),
  });
});

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

server.listen(3001, () => console.log("Rodando"));
