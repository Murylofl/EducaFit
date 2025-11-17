let frequencia = false;
(async () => {
  const res = await fetch("/alunos/1", {
    headers: {
      Authenticate: "Bearer " + sessionStorage.getItem("token"),
    },
  });

  const json = await res.json();

  console.log(json);

  frequencia = json.frequencia;
  if (frequencia == true) {
    document.getElementById("certo").style.display = "block";
    document.getElementById("errado").style.display = "none";
  } else {
    document.getElementById("certo").style.display = "none";
    document.getElementById("errado").style.display = "block";
  }
})();

fetch("/api/aluno", {
  headers: {
    Authenticate: "Bearer " + sessionStorage.getItem("token"),
  },
}).then(async (res) => {
  const dados = await res.json();

  console.log(dados);

  document.getElementById("nome").innerText = dados.nomeCompleto;
  document.getElementById("data_nasc").innerText = dados.dataDeNasciment;
  document.getElementById("matricula").innerText = dados.matricula;
  document.getElementById("telefone").innerText = dados.telefone;
  document.getElementById("email").innerText = dados.eMail;
});
