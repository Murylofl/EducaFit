fetch("https://8hrchg-3000.csb.app/api/aluno", {
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
