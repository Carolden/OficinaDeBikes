let corpoTabela = document.getElementById('corpo-tabela');

async function buscar () {
  let resposta = await fetch('http://localhost:3000/ordem');
  let oss = await resposta.json();

  for (let os of oss) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdCliente = document.createElement('td');
    let tdStatus = document.createElement('td');
    let tdDataCriacao = document.createElement('td');
    let tdDataInicio = document.createElement('td');
    let tdDataConclusao = document.createElement('td');
    let tdValor = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = os.ordemid;
    tdCliente.innerText = os.cliente?.nome;
    tdStatus.innerText = os.statusOrdemServico;
    tdDataCriacao.innerText = os.dataCriacao ? new Date(os.dataCriacao).toLocaleDateString() : "";
    tdDataInicio.innerText = os.dataInicioServico ? new Date(os.dataInicioServico).toLocaleDateString() : "";
    tdDataConclusao.innerText = os.dataConclusaoServico ? new Date(os.dataConclusaoServico).toLocaleDateString() : "";
    tdValor.innerText = os.valor == null ? '' : 'R$ ' + os.valor;

    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="formulario.html?id=${os.ordemid}">Editar</a>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdId);
    tr.appendChild(tdCliente);
    tr.appendChild(tdStatus);
    tr.appendChild(tdDataCriacao);
    tr.appendChild(tdDataInicio);
    tr.appendChild(tdDataConclusao);
    tr.appendChild(tdValor);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

// async function excluir (id) {
//   let confirma = confirm("Deseja excluir esse? Esta ação não pode ser revertida.")
//   if(confirma) {
//     await fetch('http://localhost:3000/ordem/' + id, {
//     method: 'DELETE'
//   });

//   window.location.reload();
//   }

// }

buscar();



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

