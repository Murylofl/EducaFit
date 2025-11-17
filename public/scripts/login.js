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
    body: JSON.stringify({ matricula, senha }),
  }).then(async (res) => {
    if (res.ok) {
      const { token } = await res.json();
      sessionStorage.setItem("token", token);

      window.location.href = "/principal";
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
