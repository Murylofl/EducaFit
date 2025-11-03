let verificacao = localStorage.getItem("verificacao");
if (verificacao == "certo") {
  document.getElementById("certo").style.display = "block";
  document.getElementById("errado").style.display = "none";
} else {
  document.getElementById("certo").style.display = "none";
  document.getElementById("errado").style.display = "block";
}

fetch("https://s3ddht-3000.csb.app/api/aluno", {
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
