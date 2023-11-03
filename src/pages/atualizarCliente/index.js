let nome = document.getElementById('nome');
let endereco = document.getElementById('endereco');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let id = document.getElementById('id');
let button = document.getElementById('button');


button.addEventListener('click', async (event) => {

  console.log(nome.innerText, endereco.innerText, telefone.innerText, email.innerText);

  let idCliente = id.value

  let payload = {
    nome: nome.value,
    endereco: endereco.value,
    email: email.value,
    telefone: telefone.value,
  };

  let resposta = await fetch(`http://localhost:3000/cliente/${idCliente}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    alert('Cliente atualizado com sucesso!')
    window.location.reload(true)
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }


})
