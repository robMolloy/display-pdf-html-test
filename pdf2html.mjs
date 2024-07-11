const PDF_PATH = "./pdfs/compressed.tracemonkey-pldi-09.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "./node_modules/pdfjs-dist/build/pdf.worker.mjs";

async function pageLoaded() {
  // Loading document and page text content
  const loadingTask = pdfjsLib.getDocument({ url: PDF_PATH });
  const pdfDocument = await loadingTask.promise;
  const page = await pdfDocument.getPage(1);
  const textContent = await page.getTextContent();
  // building SVG and adding that to the DOM
  const textArray = textContent.items.map((textItem) => textItem.str);
  console.log(textArray);

  document.getElementById("pageContainer").insertAdjacentHTML(
    `beforeend`,
    `<div>
  ${textArray.map((x) => `<div>${x}</div>`)}
  </div>`
  );
  // Release page resources.
  page.cleanup();
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof pdfjsLib === "undefined") {
    // eslint-disable-next-line no-alert
    alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
    return;
  }
  pageLoaded();
});
