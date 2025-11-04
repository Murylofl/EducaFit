const senhaAntiga = senha;

fetch("https://s3ddht-3000.csb.app/api/aluno", {
  headers: {
    Authenticate: "Bearer " + sessionStorage.getItem("token"),
  },
}).then(async (res) => {
  const dados = await res.json();

  console.log(dados);

  document.getElementById("nome").value = dados.nomeCompleto;
  document.getElementById("telefone").value = dados.telefone;
  document.getElementById("email").value = dados.eMail;

  if senhaAntiga == senha{
    senhaAntiga = senhaNova
  }
});




import bcrypt from 'bcryptjs';

// userId extraído do JWT
const user = await prisma.user.findUnique({
  where: { id: userId },
});

if (!user) {
  return res.status(404).json({ message: 'Usuário não encontrado.' });
}

// Verifica se a senha antiga está correta
const senhaCorreta = await bcrypt.compare(senhaAntiga, user.password);

if (!senhaCorreta) {
  return res.status(401).json({ message: 'Senha antiga incorreta.' });
}

// Atualiza para a nova senha (hasheada)
const novaSenhaHash = await bcrypt.hash(senhaNova, 10);

await prisma.user.update({
  where: { id: userId },
  data: { password: novaSenhaHash },
});

return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
