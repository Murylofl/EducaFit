const token = sessionStorage.getItem("token");
async function desabilitar() {
  sessionStorage.removeItem("token");
  await fetch("/alunos/", {
    method: "DELETE",
    headers: {
      Authenticate: "Bearer " + token,
    },
  });

  window.location.href = "/inicial";
}
