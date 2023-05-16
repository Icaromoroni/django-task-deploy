const tarefasURL = 'https://api-task-ncpu.onrender.com/tarefas/'
const searchURL = 'https://api-task-ncpu.onrender.com/search/'
const listContainer = document.querySelector('#list-container');
const accessToken = localStorage.getItem('access_token');

function renderTasks() {
// Faz uma requisição GET para a API
fetch(tarefasURL , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
    
    //função para listar tarefas
    listTask(data)        
    });
}

// Atualiza a lista de tarefas a cada 5 segundos
// setInterval(renderTasks, 5000);

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchSelect = document.querySelector('#search-select');

searchForm.addEventListener('submit', (event) => {
event.preventDefault();

// Obter a opção selecionada do campo de seleção
const searchOption = searchSelect.value;

// Obter o valor digitado no campo de pesquisa
const searchTerm = searchInput.value;

// Montar a URL da API com base na opção selecionada
const result = `${searchURL}?${searchOption}=${searchTerm}`;
if (searchOption === 'situacao') {
    result
} else if (searchOption === 'nivel') {
    result
} else if (searchOption === 'prioridade') {
    result
}

// Fazer uma requisição GET para a API com a URL montada
fetch(result, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    })
    .then(response => response.json())
    .then(data => {
    // função para listar todas tarefas filtradas
    listTask(data)
    })
    .catch(error => {
    // Criar mensagem de erro
    const msg = document.createElement('p');
    msg.innerHTML = `Tarefa não existe.`;
    
    
    // Adicionar mensagem de erro ao DOM
    const container = document.querySelector('#list-container');
    container.appendChild(msg);

    // Registrar erro no console
    console.error(error);
    });
        
    });

function listTask(data){
// Limpar a lista atual de tarefas
listContainer.innerHTML = '';
// Adiciona cada tarefa na lista
data.forEach(task => {
        const listItem = document.createElement('li');
        
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const divItem = document.createElement('div');

        const taskName = document.createElement('a');
        taskName.href = '#';
        taskName.classList.add('descricao')
        taskName.innerText = task.descricao;
        taskName.onclick = () => {
            detalharTarefa(task.id)
        }

        const editButton = document.createElement('a');
        editButton.href = '#'
        editButton.classList.add('mx-3');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.onclick = () => {
        editarTarefa(task.id)
        }

        const statusButton = document.createElement('a');
        statusButton.href = '#'
        statusButton.classList.add('mx-3');
        statusButton.innerHTML = '<i class="fas fa-check"></i>';
        statusButton.onclick = () => {
        formSituaçao(task)
        
        }

        const deleteButton = document.createElement('a');
        deleteButton.href = '#'
        deleteButton.classList.add('mx-3');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = () => {
            deletar(task.id)
        }

        
        divItem.appendChild(editButton);
        divItem.appendChild(statusButton);
        divItem.appendChild(deleteButton);

        listItem.appendChild(taskName);
        listItem.appendChild(divItem);

        listContainer.appendChild(listItem);
    });
}

// Essa função direciona para o formulario levando o id da tarefa a ser alterada.
function editarTarefa(id) {
window.location.href = 'formulario.html?id=' + id;
}


function formSituaçao(task){
const form = document.createElement('form');
form.classList.add('list-group-item');
form.id = 'formSituacao'

    if (task.situacao === 'Resolvida' || task.situacao === 'Cancelada') {
    alert(`Não é possível alterar uma tarefa ${task.situacao}`);
    return;
    }else if (task.situacao === 'Nova') {
        form.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="situacao" id="andamentoRadio" value="Em andamento">
            <label class="form-check-label" for="andamentoRadio">
            Em andamento
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="situacao" id="pendenteRadio" value="Pendente">
            <label class="form-check-label" for="pendenteRadio">
            Pendente
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="situacao" id="canceladaRadio" value="Cancelada">
            <label class="form-check-label" for="canceladaRadio">
            Cancelada
            </label>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
        `;
    }else if (task.situacao === 'Em andamento') {
    form.innerHTML = `
        <div class="form-check">
        <input class="form-check-input" type="radio" name="situacao" id="pendenteRadio" value="Pendente">
        <label class="form-check-label" for="pendenteRadio">
            Pendente
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="situacao" id="canceladaRadio" value="Cancelada">
        <label class="form-check-label" for="canceladaRadio">
            Cancelada
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="situacao" id="resolvidaRadio" value="Resolvida">
        <label class="form-check-label" for="resolvidaRadio">
            Resolvida
        </label>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
    `;
    }else if (task.situacao === 'Pendente') {
    form.innerHTML = `
        <div class="form-check">
        <input class="form-check-input" type="radio" name="situacao" id="em-andamento" value="Em andamento">
        <label class="form-check-label" for="em-andamento">
            Em andamento
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="situacao" id="cancelada" value="Cancelada">
        <label class="form-check-label" for="cancelada">
            Cancelada
        </label>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
    `;
    }
    listContainer.appendChild(form)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formulario = document.getElementById('formSituacao');
        const formData = new FormData(formulario);
        const valor = formData.get('situacao');

        const dados = {
            "descricao": task.descricao,
            "responsavel": task.responsavel,
            "situacao": valor,
            "nivel": task.nivel,
            "prioridade": task.prioridade
            };

        fetch(tarefasURL + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(dados)
        }
        )
        setTimeout(function() {
            location.reload()
          }, 90);
    }
    )
}
function detalharTarefa(id) {
    fetch(`${tarefasURL}${id}`,{
        headers:{
            'Authorization': `Bearer ${accessToken}`}
    })
      .then(response => response.json())
      .then(data => {
        const descricaoTarefa = document.createElement('main');
        descricaoTarefa.innerHTML = `<p> Descrição: ${data.descricao}</p>
                                        <p>Responsavel: ${data.responsavel}</p>
                                        <p>Situação: ${data.situacao}</p>
                                        <p>Nivel: ${data.nivel}</p>
                                        <p>Prioridade: ${data.prioridade}</p>
                                        <button class="btn btn-primary btn-sm" onclick="location.reload()">Voltar</button>`;
        listContainer.innerHTML = '';
        listContainer.appendChild(descricaoTarefa)
      })
      .catch(error => console.error(error));
  }

function deletar(id){

    fetch(tarefasURL + id, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${accessToken}`}
    })
    .then(response => {
        if (response.ok) {
            listContainer.innerHTML = '';
            listContainer.innerHTML = `<p class="text-center">Apagando tarefa!</p>
                                    <div class="d-flex justify-content-center">
                                      <div class="spinner-grow spinner-grow-sm text-light" role="status">
                                        <span class="visually-hidden"></span>
                                      </div>
                                      <div class="spinner-grow spinner-grow-sm text-light" role="status">
                                        <span class="visually-hidden"></span>
                                      </div>
                                      <div class="spinner-grow spinner-grow-sm text-light" role="status">
                                        <span class="visually-hidden"></span>
                                      </div>
                                    </div>`
            setTimeout(function() {
              // código que será executado após 2 segundos
              location.reload()
            }, 1000);
        } else {
          throw new Error('Não foi possível excluir a tarefa');
        }
      })
      .catch(error => {
        console.error(error);
      });
}

// selecione o botão "Sair" na barra de navegação
const logoutButton = document.getElementById("btn-sair");

// adicione um listener de evento de clique
logoutButton.addEventListener("click", function(event) {
  event.preventDefault(); // previne o comportamento padrão do botão

  // remove o token do localStorage
  localStorage.removeItem("access_token");

  // redireciona para a página de login
  window.location.href = "login.html";
});


renderTasks()