const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");
fetch("/api/alunos/", {
  method: "DELETE",
  headers: {
    Authenticate: "Bearer " + token,
  },
});
