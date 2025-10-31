document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let nome_comnpleto = document.getElementById("nome-comnpleto").value;
  let data_de_nascimeno = document.getElementById("data-de-nascimento").value;
  let e_mail = document.getElementById("e-mail").value;
  let telefone = document.getElementById("telefone").value;
  let matricula = document.getElementById("matricula").value;
  let senha = document.getElementById("senha").value;

  fetch("/api/cadastro", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{nomeCompleto:${nome_comnpleto},dataDeNasciment:${data_de_nascimeno},eMail:${e_mail},telefone:${telefone},matricula:${matricula},senha:${senha}}`,
  }).then((res) => {
    if (res.ok) {
      window.location.href = "/pages/principal.html";
    } else {
      alert("Algo eatá errado!");
    }
  });
});
