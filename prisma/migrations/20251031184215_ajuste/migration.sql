-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "dataDeNasciment" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "frequencia" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_telefone_key" ON "Aluno"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
