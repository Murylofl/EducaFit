let borda = document.querySelector("#inputSenha");
function mostrarSenha() {
  let aberto = document.querySelector("#aberto");
  let fechado = document.querySelector("#fechado");
  let input = document.querySelector("#senha");

  if (aberto.style.display == "block" || aberto.style.display == "") {
    aberto.style.display = "none";
    fechado.style.display = "block";
    input.type = "text";
  } else {
    aberto.style.display = "block";
    fechado.style.display = "none";
    input.type = "password";
  }
}
lista_id = {};
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let nome_completo = document.getElementById("nome-completo").value;
  let data_de_nascimeno = document.getElementById("data-de-nascimento").value;
  let e_mail = document.getElementById("e-mail").value;
  let telefone = document.getElementById("telefone").value;
  let matricula = document.getElementById("matricula").value;
  let senha = document.getElementById("senha").value;
  lista_seu = {
    "nome-completo": nome_completo,
    "e-mail": e_mail,
    telefone: telefone,
  };
  lista_sua = {
    "data-de-nascimento": data_de_nascimeno,
    matricula: matricula,
    senha: senha,
  };
  console.log({
    nome_completo,
    data_de_nascimeno,
    e_mail,
    telefone,
    senha,
    matricula,
  });
  let erros = 0;
  for (coisa in lista_seu) {
    if (document.getElementById(coisa).value == "") {
      document.getElementById(coisa).value = "";
      document.getElementById(coisa).style.borderColor = "red";
      document.getElementById(coisa).style.color = "red";
      document.getElementById(coisa).style.setProperty("--ph-color", "red");
      if (coisa == "nome-completo") {
        document.getElementById(coisa).attributes.placeholder.value =
          "Digite seu nome completo";
      } else {
        document.getElementById(coisa).attributes.placeholder.value =
          "Digite seu " + coisa + "!";
      }
      document.getElementById(coisa).value = "";

      erros++;
    } else {
      document.getElementById(coisa).style.borderColor = "black";
      document.getElementById(coisa).style.setProperty("--ph-color", "black");
    }
  }
  for (coisa in lista_sua) {
    console.log(coisa);
    if (document.getElementById(coisa).value == "") {
      document.getElementById(coisa).value = "";
      if (coisa == "senha") {
        borda.style.border = "solid red";
      }
      document.getElementById(coisa).style.borderColor = "red";
      document.getElementById(coisa).style.color = "red";
      document.getElementById(coisa).style.setProperty("--ph-color", "red");
      document.getElementById(coisa).attributes.placeholder.value =
        "Digite sua " + coisa + "!";
      document.getElementById(coisa).value = "";

      erros++;
    } else {
      if (coisa == "senha") {
        borda.style.border = "solid black";
      }
      document.getElementById(coisa).style.borderColor = "black";
      console.log("black");
      document.getElementById(coisa).style.color = "black";
      document.getElementById(coisa).style.setProperty("--ph-color", "black");
    }
  }
  if (erros > 0) return;

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
    if (res.status == 422) {
      const mensagem = await res.json();
      const erro = 0;
      mensagem.err.meta.target.map((err) => {
        if (err == "matricula") {
          document.getElementById("matricula").value = "";
          document.getElementById("matricula").style.borderColor = "red";
          document.getElementById("matricula").style.color = "red";
          document
            .getElementById("matricula")
            .style.setProperty("--ph-color", "red");
          document.getElementById("matricula").attributes.placeholder.value =
            "Essa matrícula já existe!";
          document.getElementById("matricula").value = "";

          erro += 1;
        }
        if (err == "telefone") {
          document.getElementById("telefone").value = "";
          document.getElementById("telefone").style.borderColor = "red";
          document.getElementById("telefone").style.color = "red";
          document
            .getElementById("telefone")
            .style.setProperty("--ph-color", "red");
          document.getElementById("telefone").attributes.placeholder.value =
            "Esse telefone já existe!";
          document.getElementById("telefone").value = "";

          erro += 1;
        }
        if (erro >= 1) {
          return;
        }
      });
    }
    if (res.status == 200) {
      const { token } = await res.json();
      sessionStorage.setItem("token", token);
      window.location.href = "/principal";
    }
  });
});
