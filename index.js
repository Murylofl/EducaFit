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
server.use(express.static("public"));
server.use(express.json());

server.get("/alunos", async (req, res) => {
  const alunos = await db.aluno.findMany();
  res.json(alunos);
});

server.put("/apialunos/frequencia", autenticar, async (req, res) => {
  const id = req.decodificado.id;
  const frequencia = req.body.frequencia;

  const alunoAtualizado = await prisma.aluno.update({
    where: {
      where: { id },
    },
    data: {
      frequencia,
    },
  });
  res.status(202).json({ mensagem: "sucesso" });
});

server.post("/api/login", async (req, res) => {
  const { matricula, senha } = req.body;

  const aluno = await db.aluno.findFirst({
    where: { matricula, senha },
  });

  if (!aluno) {
    res.status(400).json({ erro: "usuário ou senha invalidos" });
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

server.put("/api/alunos", autenticar, async (req, res) => {
  const { nomeCompleto, eMail, telefone, senha, novaSenha } = req.body;

  const aluno = await db.aluno.findUnique({
    where: { id: req.decodificado.id },
  });
  if (senha != aluno.senha) {
    res.status(400).send("senha invalida");
    return;
  }
  await db.aluno.update({
    where: { id: req.decodificado.id },
    data: {
      eMail,
      nomeCompleto,
      telefone,
      senha: novaSenha,
    },
  });
  res.status(200).send("cadastro alterado!");
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

server.get("/inicial", (req, res) => {
  res.sendFile(__dirname + "/pages/inicial.html");
});

server.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});
server.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/pages/cadastro.html");
});
server.get("/sobre-nos", (req, res) => {
  res.sendFile(__dirname + "/pages/sobre-nos.html");
});

server.get("/principal", (req, res) => {
  res.sendFile(__dirname + "/pages/principal.html");
});
server.get("/menu-lateral", (req, res) => {
  res.sendFile(__dirname + "/pages/menu-lateral.html");
});
server.get("/sobre-nos-menu", (req, res) => {
  res.sendFile(__dirname + "/pages/sobre-nos-menu.html");
});
server.get("/atualizar-cadastro", (req, res) => {
  res.sendFile(__dirname + "/pages/atualizar-cadastro.html");
});
server.get("/desabilitar-cadastro", (req, res) => {
  res.sendFile(__dirname + "/pages/desabilitar-cadastro.html");
});
server.get("/conta", (req, res) => {
  res.sendFile(__dirname + "/pages/conta.html");
});

server.listen(3000, () => console.log("Rodando"));
