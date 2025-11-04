const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { db } = require("./db");

const SECRET =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

function autenticar(req, res, next) {
  const token = req.header("Authenticate")?.split("Bearer ")[1];

  if (!token) {
    res.status(401).json({ erro: "Token de acesso nescessário" });
    return;
  }

  try {
    const decodificado = jwt.verify(token, SECRET);
    req.decodificado = decodificado;
    next();
  } catch (err) {
    res.status(401).json({ erro: "Token invalido" });
  }
}

const server = express();

server.use(cors());
server.use(express.json());

server.get("/alunos", async (req, res) => {
  const alunos = await db.aluno.findMany();
  res.json(alunos);
});

server.put("/alunos/frequencia/certo/:id", async (req, res) => {
  const alunoAtualizado = await prisma.aluno.update({
    where: {
      where: { id: req.params.id },
    },
    data: {
      frequencia: true,
    },
  });
  res.json(200);
});
server.put("/alunos/frequencia/errado/:id", async (req, res) => {
  const alunoAtualizado = await prisma.aluno.update({
    where: {
      where: { id: req.params.id },
    },
    data: {
      frequencia: false,
    },
  });
  res.json(200);
});

server.post("/api/login", async (req, res) => {
  const { matricula, senha } = req.body;

  const aluno = await db.aluno.findFirst({
    where: { matricula, senha },
  });

  if (!aluno) {
    res.status(400).json({ erro: "suario ou senha invalidos" });
    return;
  }

  const token = jwt.sign({ id: aluno.id }, SECRET);
  res.status(200).json({ token });
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
server.put("/alunos/id", async (req, res) => {
  await db.aluno.update({
    where: { id: req.params.id },
    email: "",
    telefone: "",
  });
});

server.post("/api/cadastro", async (req, res) => {
  console.log(req.body);

  const { nomeCompleto, dataDeNasciment, eMail, telefone, matricula, senha } =
    req.body;
  const aluno = await db.aluno.create({
    data: {
      nomeCompleto: nomeCompleto,
      dataDeNasciment: dataDeNasciment,
      eMail: eMail,
      telefone: telefone,
      frequencia: false,
      matricula: matricula,
      senha: senha,
    },
  });

  res.json({ ok: "oi" });
});

server.get("/api/aluno", autenticar, async (req, res) => {
  const id = req.decodificado.id;

  const aluno = await db.aluno.findUnique({
    where: {
      id,
    },
  });
  res.json(aluno);
});

server.listen(3000, () => console.log("Rodando"));
