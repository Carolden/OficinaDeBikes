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

  let resposta = await fetch(`http://localhost:3000/cliente/${idCliente}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    // body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    alert('Cliente deletado com sucesso!')
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

  let response = await fetch(`http://localhost:3000/cliente`);
  let infos = await response.json();



  for (let info of infos) {
  let tr = document.createElement('tr');
  let id = document.createElement('td');
  let nome = document.createElement('td');
  let endereco = document.createElement('td');
  let email = document.createElement('td');
  let telefone = document.createElement('td');

  id.innerText = info.id;
  nome.innerText = info.nome;
  endereco.innerText = info.endereco;
  email.innerText = info.email;
  telefone.innerText = info.telefone;

  tr.appendChild(id);
  tr.appendChild(nome);
  tr.appendChild(endereco);
  tr.appendChild(email);
  tr.appendChild(telefone);


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



