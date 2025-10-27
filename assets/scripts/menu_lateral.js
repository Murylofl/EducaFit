let verificacao = localStorage.getItem("verificacao");
if (verificacao == "certo") {
  document.getElementById("certo").style.display = "block";
  document.getElementById("errado").style.display = "none";
} else {
  document.getElementById("certo").style.display = "none";
  document.getElementById("errado").style.display = "block";
}
