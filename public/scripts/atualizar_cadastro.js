const senhaAntiga = senha;

fetch("https://s3ddht-3000.csb.app/api/aluno", {
  headers: {
    Authenticate: "Bearer " + sessionStorage.getItem("token"),
  },
}).then(async (res) => {
  const dados = await res.json();

  console.log(dados);

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

  fetch("https://s3ddht-3000.csb.app/api/alunos/", {
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
    } else {
      console.log(res);
      console.log(await res.text());
      alert("Algo está errado!");
    }
  });
});
