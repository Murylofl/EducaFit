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
    const valor = lista_seu[coisa];
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
    const valor = lista_sua[coisa];
    if (document.getElementById(coisa).value == "") {
      document.getElementById(coisa).value = "";
      document.getElementById(coisa).style.borderColor = "red";
      document.getElementById(coisa).style.color = "red";
      document.getElementById(coisa).style.setProperty("--ph-color", "red");
      document.getElementById(coisa).attributes.placeholder.value =
        "Digite sua " + coisa + "!";
      document.getElementById(coisa).value = "";

      erros++;
    } else {
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
