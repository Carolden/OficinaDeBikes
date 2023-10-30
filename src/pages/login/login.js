let inputEmail = document.getElementById('floatingInput');
let inputSenha = document.getElementById('floatingPassword');
let button = document.getElementById('button');

button.addEventListener('click', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  let resposta = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  console.log(resposta.ok);

  if (resposta.ok) {
    location.href = './../index/index.html'
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }
});
