let descricao = document.getElementById('descricao');
let statusOrdem = document.getElementById('status');
let inicio = document.getElementById('inicio');
let conclusao = document.getElementById('conclusao');
let modelo = document.getElementById('modelo');
let marca = document.getElementById('marca');
let valor = document.getElementById('valor');
let cliente = document.getElementById('cliente');




button.addEventListener('click', async (event) => {
  console.log(descricao.value, statusOrdem.value, inicio.value, conclusao.value, modelo.value, marca.value, valor.value, cliente.value);

  // let dataCriacao = new Date.now();
  // let hoje = new Date(dataCriacao)
  // hoje.toDateString();

  let clienteNumero = Number(cliente.value);

  console.log(clienteNumero);

  let payload = {
    dataCriacao: "2023-11-06T12:00:00",
    descricaoServico: descricao.value,
    statusOrdemServico: statusOrdem.value,
    dataInicioServico: inicio.value,
    dataConclusaoServico: conclusao.value,
    bicicletaModelo : modelo.value,
    bicicletaMarca: marca.value,
    valor: valor.value,
    clienteId: clienteNumero,
  };

  let resposta = await fetch('http://localhost:3000/ordem', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    alert('Ordem cadastrada com sucesso!')
    window.location.reload(true)
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }


})

