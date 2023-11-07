let descricao = document.getElementById('descricao');
let statusOrdem = document.getElementById('status');
let inicio = document.getElementById('inicio');
let conclusao = document.getElementById('conclusao');
let modelo = document.getElementById('modelo');
let marca = document.getElementById('marca');
let valor = document.getElementById('valor');
let cliente = document.getElementById('cliente');
let id = document.getElementById('ordemid');
let button = document.getElementById('button');


button.addEventListener('click', async (event) => {

  let ordemid = id.value
  let clienteNumero = Number(cliente.value);


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

  let resposta = await fetch(`http://localhost:3000/ordem/${ordemid}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    alert('Ordem atualizada com sucesso!')
    window.location.reload(true)
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }


})

