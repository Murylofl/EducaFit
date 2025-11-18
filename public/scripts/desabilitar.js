const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");

fetch("api/alunos/", {
  headers: {
    method: "DELETE",
    Authenticate: "Bearer " + token,
  },
});
