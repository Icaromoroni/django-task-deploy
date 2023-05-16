const accessToken = localStorage.getItem('access_token');
const urlBase = "https://api-task-ncpu.onrender.com/tarefas/"
const urlParams = new URLSearchParams(window.location.search);

let editando = false

// confere se na url o id esta presente, se estiver altera o valor da variavel editando
if (urlParams.size === 1){
  editando = true
}

const formulario = document.getElementById("meuFormulario");


if (editando){
  const id = urlParams.get('id');

  fetch( urlBase + id,{
    headers: {'Authorization': `Bearer ${accessToken}`}
  })
    .then(response => response.json())
    .then(data => {
      // preencher os campos do formulário com os dados da tarefa
      document.querySelector("#descricao").value = data.descricao;
      document.querySelector("#responsavel").value = data.responsavel;
      document.querySelector("#situacao").value = data.situacao;
      document.querySelector("#nivel").value = data.nivel;
      document.querySelector("#prioridade").value = data.prioridade;
    });

    formulario.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(formulario);

      fetch(urlBase + id, {
        method: 'PUT',
        body: formData,
          headers: {'Authorization': `Bearer ${accessToken}`}
        
      })
        .then(response => response.json())
        .then(data => {
          // exibir mensagem de sucesso e redirecionar para a página de lista de tarefas após 2 segundos
          formulario.innerHTML = '';
          formulario.innerHTML = `<p class="text-center">Atualizando tarefa!</p>
                                  <div class="d-flex justify-content-center">
                                    <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>
                                  </div>`
          formulario.reset();
          setTimeout(function() {
            // código que será executado após 2 segundos
            window.location.href = 'index.html';
          }, 1000);
          


        });
    });
} else {
  formulario.addEventListener("submit", enviarFormulario);

  function enviarFormulario(event) {
    event.preventDefault();

    const dados = new FormData(formulario);

    fetch( urlBase, {
      method: "POST",
      body: dados,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // exibir mensagem de sucesso e redirecionar para a página de lista de tarefas após 2 segundos
      formulario.innerHTML = '';
      formulario.innerHTML = `<p class="text-center">Atualizando tarefa!</p>
                              <div class="d-flex justify-content-center">
                                <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                              </div>`
      formulario.reset();
      setTimeout(function() {
        // código que será executado após 2 segundos
        window.location.href = 'index.html';
      }, 1000)
    .catch(error => console.error(error));
  }
)}}