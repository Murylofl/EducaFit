document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let matricula = document.getElementById("matricula").value;
  let senha = document.getElementById("senha").value;

  if (matricula == "" || senha == "") {
    return;
  }

  fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{matricula:${matricula},senha:${senha}}`,
  }).then((res) => {
    if (res.ok) {
      alert("sucesso");
      window.location.href = "/pages/principal.html";
    } else {
      alert("Algo eatá errado!");
    }
  });
});
