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

  function formatarDataParaBackend(data) {
    let ano = data.getFullYear();
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dia = String(data.getDate()).padStart(2, '0');
    let horas = String(data.getHours()).padStart(2, '0');
    let minutos = String(data.getMinutes()).padStart(2, '0');
    let segundos = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  }

  // let inicioDate = new Date(inicio.value);
  // let conclusaoDate = new Date(conclusao.value);

  // let inicioFormatado = formatarDataParaBackend(inicioDate);
  // let conclusaoFormatada = formatarDataParaBackend(conclusaoDate);



  let payload = {};

  if (descricao.value) {
    payload.descricaoServico = descricao.value;
  }

  if (statusOrdem.value) {
    payload.statusOrdemServico = statusOrdem.value;
  }

  if (inicio.value) {
    let inicioDate = new Date(inicio.value);
    let inicioFormatado = formatarDataParaBackend(inicioDate);
    payload.dataInicioServico = inicioFormatado;
  }

  if (conclusao.value) {
  let conclusaoDate = new Date(conclusao.value);
  let conclusaoFormatada = formatarDataParaBackend(conclusaoDate);
  payload.dataConclusaoServico = conclusaoFormatada;
  }

  if (modelo.value) {
    payload.bicicletaModelo = modelo.value;
  }

  if (marca.value) {
    payload.bicicletaMarca = marca.value;
  }

  if (valor.value) {
    payload.valor = valor.value;
  }

  if (clienteNumero) {
    payload.clienteId = clienteNumero;
  }



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

