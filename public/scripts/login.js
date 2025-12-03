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
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("fazendo login");
  let matricula = document.getElementById("matricula").value;
  let senha = document.getElementById("senha").value;

  fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matricula, senha }),
  }).then(async (res) => {
    if (res.ok) {
      const { token } = await res.json();
      sessionStorage.setItem("token", token);

      window.location.href = "/principal";
    } else {
      objetos = { matricula, senha };
      for (coisa in objetos) {
        const valor = objetos[coisa];
        if (valor == "") {
          for (coisa_2 in objetos) {
            document.getElementById(coisa_2).value = "";
            document.getElementById(coisa_2).style.borderColor = "red";
            borda.style.border = "solid red";
            document.getElementById(coisa_2).style.borderColor = "red";
            document
              .getElementById(coisa_2)
              .style.setProperty("--ph-color", "red");
            document.getElementById(coisa_2).attributes.placeholder.value =
              "Há informações faltando";
          }
        } else {
          for (coisa_2 in objetos) {
            console.log("matheuschato");
            document.getElementById(coisa_2).value = "";
            document.getElementById(coisa_2).style.borderColor = "red";
            borda.style.border = "solid red";
            document
              .getElementById(coisa_2)
              .style.setProperty("--ph-color", "red");
            document.getElementById(coisa_2).attributes.placeholder.value =
              "Matrícula ou senha inválidas!";
          }
        }
      }
    }
  });
});
