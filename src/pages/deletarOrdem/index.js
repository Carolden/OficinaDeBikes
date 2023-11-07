let nome = document.getElementById('nome');
let endereco = document.getElementById('endereco');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let id = document.getElementById('id');
let corpoTabela = document.getElementById('corpo-tabela');
let bntListUsers = document.getElementById('bnt-listUsers');

let button = document.getElementById('button');

let btnExportPDF = document.getElementById('bnt-exportPDF')


button.addEventListener('click', async (event) => {

  // console.log(nome.innerText, endereco.innerText, telefone.innerText, email.innerText);

  let idCliente = id.value

  // let payload = {
  //   nome: nome.value,
  //   endereco: endereco.value,
  //   email: email.value,
  //   telefone: telefone.value,
  // };

  let resposta = await fetch(`http://localhost:3000/ordem/${idCliente}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    // body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    alert('Ordem deletada com sucesso!')
    window.location.reload(true)
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }


})

bntListUsers.addEventListener('click', async () => {
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild);
  }

  let response = await fetch(`http://localhost:3000/ordem`);
  let infos = await response.json();



  for (let info of infos) {
  let tr = document.createElement('tr');
  let status = document.createElement('td');
  let modelo = document.createElement('td');
  let marca = document.createElement('td');
  let valor = document.createElement('td');
  let cliente = document.createElement('td');

  status.innerText = info.status;
  modelo.innerText = info.modelo;
  marca.innerText = info.marca;
  valor.innerText = info.valor;
  cliente.innerText = info.cliente;

  tr.appendChild(status);
  tr.appendChild(modelo);
  tr.appendChild(marca);
  tr.appendChild(valor);
  tr.appendChild(cliente);


  corpoTabela.appendChild(tr);
  }
});


function download(content, mimeType, filename) {
  const a = document.createElement("a");
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
}

async function exportPdf() {
  let pdf = await fetch("http://localhost:3000/clientePDF", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      // Authorization: authorization,
    },
  });
  download(await pdf.blob(), "application/x-pdf", "ListaClientes.pdf");
}

async function exportCsv() {
  let csv = await fetch("http://localhost:3000/clienteCSV", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      // Authorization: authorization,
    },
  });
  download(await csv.text(), "text/csv", "ListaClientes.csv");
}



