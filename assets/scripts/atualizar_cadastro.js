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
  document.getElementById("senha").value = dados.senha;
});
