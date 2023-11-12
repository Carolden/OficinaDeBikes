let corpoTabela = document.getElementById('corpo-tabela');

async function buscarClientes () {
  let resposta = await fetch('http://localhost:3000/cliente');
  let clientes = await resposta.json();

  for (let cliente of clientes) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = cliente.nome;
    tdEmail.innerText = cliente.email;
    tdTelefone.innerText = cliente.telefone;

    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="formulario.html?id=${cliente.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cliente.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse cliente? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/cliente/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }

}

buscarClientes();
