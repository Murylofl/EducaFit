fetch("api/alunos", {
  headers: {
    method: "DELETE",
    Authenticate: "Bearer " + sessionStorage.getItem("token"),
  },
});
