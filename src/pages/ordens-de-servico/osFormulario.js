const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let form = document.getElementById('formulario');
let descricao = document.getElementById('descricao');
let statusOrdem = document.getElementById('status');
let inicio = document.getElementById('inicio');
let conclusao = document.getElementById('conclusao');
let modelo = document.getElementById('modelo');
let marca = document.getElementById('marca');
let valor = document.getElementById('valor');
let cliente = document.getElementById('cliente');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/ordem/' + id);
  if (resposta.ok) {
    let os = await resposta.json();

    descricao.value = os.descricaoServico;
    statusOrdem.value = os.statusOrdemServico;
    inicio.value = os.dataInicioServico?.split('T')[0] || "";
    conclusao.value = os.dataConclusaoServico?.split('T')[0] || "";
    modelo.value = os.bicicletaModelo;
    marca.value = os.bicicletaMarca;
    valor.value = os.valor;
    cliente.value = os.cliente.id;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}

if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    descricaoServico: descricao.value,
    statusOrdemServico: statusOrdem.value,
    dataInicioServico: inicio.value,
    dataConclusaoServico: conclusao.value,
    bicicletaModelo: modelo.value,
    bicicletaMarca: marca.value,
    valor: valor.value,
    clienteId: cliente.value,
  }

  let url = 'http://localhost:3000/ordem';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'index.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});
