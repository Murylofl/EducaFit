addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file-anexo");

  fileInput.addEventListener("change", async (ev) => {
    const file = ev.target.files && ev.target.files[0];
  });

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

  let latestJsonBlobUrl = null;

  fileInput.addEventListener("change", async (ev) => {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    if (!file.type || !file.type.includes("pdf")) {
      alert("Por favor selecione um arquivo PDF.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const pages = [];
      let fullText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items.map((item) => item.str).join(" ");
        pages.push({ pageNumber: i, text: pageText });
        fullText += pageText + (i < numPages ? "\n\n" : "");
      }

      const resultJson = {
        fileName: file.name,
        fileSize: file.size,
        numPages: numPages,
        extractedAt: new Date().toISOString(),
        text: fullText,
        pages: pages,
      };

      const pretty = JSON.stringify(resultJson, null, 2);

      console.log(resultJson);
      validarPdf(resultJson.text);

      if (latestJsonBlobUrl) {
        URL.revokeObjectURL(latestJsonBlobUrl);
        latestJsonBlobUrl = null;
      }
      const blob = new Blob([pretty], { type: "application/json" });
      latestJsonBlobUrl = URL.createObjectURL(blob);
    } catch (err) {
      console.error(err);
    }
  });

  function validarPdf(texto) {
    const regex = /está frequentando/i;
    console.log(regex.test(texto));
    if (regex.test(texto)) {
      const verificar = "certo";
      localStorage.setItem("verificacao", verificar);
    } else {
      const verificar = "errado";
      localStorage.setItem("verificacao", verificar);
    }
  }
});
