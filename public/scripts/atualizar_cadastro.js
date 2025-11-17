const senhaAntiga = senha;

let senha_atual = "";

fetch("/api/aluno", {
  headers: {
    Authenticate: "Bearer " + sessionStorage.getItem("token"),
  },
}).then(async (res) => {
  const dados = await res.json();

  console.log(dados);

  senha_atual = dados.senha;

  document.getElementById("nome").value = dados.nomeCompleto;
  document.getElementById("telefone").value = dados.telefone;
  document.getElementById("email").value = dados.eMail;
});
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let nome_completo = document.getElementById("nome").value;
  let e_mail = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let senha = document.getElementById("senha").value;
  let novaSenha = document.getElementById("novaSenha").value;
  let erros = 0;
  if (senha != senha_atual) {
    document.getElementById("senha").style.borderColor = "red";
    document.getElementById("senha").style.color = "red";
    document.getElementById("senha").attributes.placeholder.value =
      "Senha inválida !";
    erros++;
  }
  if (novaSenha == "") {
    document.getElementById("novaSenha").style.borderColor = "red";
    document.getElementById("novaSenha").style.setProperty("--ph-color", "red");

    document.getElementById("novaSenha").attributes.placeholder.value =
      "Digite a nova senha !";
    erros++;
  }

  if (erros > 0) return;

  fetch("/api/alunos/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authenticate: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify({
      nomeCompleto: nome_completo,
      eMail: e_mail,
      telefone: telefone,
      senha: senha,
      novaSenha: novaSenha,
    }),
  }).then(async (res) => {
    if (res.ok) {
      window.location.href = "/conta";
    } else {
      console.log(res);
      console.log(await res.text());
    }
  });
});
