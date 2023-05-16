const urlBase = 'http://127.0.0.1:8000/api/token/';
const loginForm = document.getElementById('login-form');
const container = document.getElementById('container')

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm); // Cria um objeto FormData com os dados do formulário
  const url = urlBase; // URL da API para autenticação de usuário

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Ocorreu um erro ao efetuar o login.');
    }

    return response.json(); // Retorna a resposta da API em formato JSON
  })
  .then(function(data) {
    localStorage.setItem('access_token', data.access); // Salva o token de acesso no localStorage do navegador

    const loadingElement = document.createElement('div');
    loadingElement.classList.add('text-center')
    loadingElement.innerHTML = `
    <p>Carregando</p>
    <div class="d-flex justify-content-center">
      <div class="spinner-grow spinner-grow-sm text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
      <div class="spinner-grow spinner-grow-sm text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
      <div class="spinner-grow spinner-grow-sm text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
    `;
    container.innerHTML = '';
    container.appendChild(loadingElement); // Exibe mensagem "Carregando..." no centro da página com três spinners do Bootstrap

    setTimeout(function() {
      window.location.href = 'index.html'; // Redireciona para a página principal após o temporizador de 2 segundos
    }, 1000);
  })
  .catch(function(error) {
    console.error(error);
  });
});
