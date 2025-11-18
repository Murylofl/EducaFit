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
      document.getElementById("senha").value = "";
      document.getElementById("senha").style.borderColor = "red";
      document.getElementById("senha").style.setProperty("--ph-color", "red");
      document.getElementById("senha").attributes.placeholder.value =
        "Informação inválida!";
    }
  });
});
