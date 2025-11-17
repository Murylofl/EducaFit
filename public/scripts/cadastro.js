document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let nome_completo = document.getElementById("nome-completo").value;
  let data_de_nascimeno = document.getElementById("data-de-nascimento").value;
  let e_mail = document.getElementById("e-mail").value;
  let telefone = document.getElementById("telefone").value;
  let matricula = document.getElementById("matricula").value;
  let senha = document.getElementById("senha").value;
  console.log({
    nome_completo,
    data_de_nascimeno,
    e_mail,
    telefone,
    senha,
    matricula,
  });

  fetch("/api/cadastro", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeCompleto: nome_completo,
      dataDeNasciment: data_de_nascimeno,
      eMail: e_mail,
      telefone: telefone,
      matricula: matricula,
      senha: senha,
    }),
  }).then(async (res) => {
    if (res.status == 200) {
      const { token } = await res.json();
      sessionStorage.setItem("token", token);
      window.location.href = "/principal";
    } else {
      console.log(res);
      console.log(await res.text());
    }
  });
});
function closeModal() {
  let modal = document.querySelector(".back-modal");
  modal.classList.add("disable");
}

function showModal() {
  let modal = document.querySelector(".back-modal");
  modal.classList.remove("disable");
}
