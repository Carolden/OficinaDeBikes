let nome = document.getElementById('nome');
let endereco = document.getElementById('endereco');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let id = document.getElementById('id');
let corpoTabela = document.getElementById('corpo-tabela');

let btnExportPDF = document.getElementById('bnt-exportPDF')


async function listarOrdens() {
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild);
  }

  let response = await fetch(`http://localhost:3000/ordem`);
  let infos = await response.json();



  for (let info of infos) {
  let tr = document.createElement('tr');
  let id = document.createElement('td');
  let status = document.createElement('td');
  let modelo = document.createElement('td');
  let marca = document.createElement('td');
  let valor = document.createElement('td');
  let cliente = document.createElement('td');

  id.innerText = info.ordemid;
  status.innerText = info.statusOrdemServico;
  modelo.innerText = info.bicicletaModelo;
  marca.innerText = info.bicicletaMarca;
  valor.innerText = info.valor;
  // cliente.innerText = info.id;

  tr.appendChild(id);
  tr.appendChild(status);
  tr.appendChild(modelo);
  tr.appendChild(marca);
  tr.appendChild(valor);
  tr.appendChild(cliente);


  corpoTabela.appendChild(tr);
  }
}


function download(content, mimeType, filename) {
  const a = document.createElement("a");
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
}

async function exportPdf() {
  let pdf = await fetch("http://localhost:3000/ordemPDF", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      // Authorization: authorization,
    },
  });
  download(await pdf.blob(), "application/x-pdf", "ListaOrdens.pdf");
}

async function exportCsv() {
  let csv = await fetch("http://localhost:3000/ordemCSV", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      // Authorization: authorization,
    },
  });
  download(await csv.text(), "text/csv", "ListaOrdens.csv");
}



listarOrdens();
