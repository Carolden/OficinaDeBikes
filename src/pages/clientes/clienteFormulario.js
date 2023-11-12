const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('nome');
let inputTelefone = document.getElementById('telefone');
let inputEmail = document.getElementById('email');
let inputEndereco = document.getElementById('endereco');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cliente/' + id);
  if (resposta.ok) {
    let cliente = await resposta.json();
    inputNome.value = cliente.nome;
    inputTelefone.value = cliente.telefone;
    inputEmail.value = cliente.email;
    inputEndereco.value = cliente.endereco;
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
    nome: inputNome.value,
    telefone: inputTelefone.value,
    email: inputEmail.value,
    endereco: inputEndereco.value
  }

  let url = 'http://localhost:3000/cliente';
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
