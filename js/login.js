const urlBase = 'http://127.0.0.1:8000/api/token/';
const loginForm = document.getElementById('login-form');
const accessToken = localStorage.getItem('access_token');

console.log(accessToken)

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm); // Cria um objeto FormData com os dados do formulário
  const url = urlBase; // URL da API para autenticação de usuário

  fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
        'Authorization': `Bearer ${accessToken}` // adiciona o token no cabeçalho
      }
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
    loadingElement.className = 'd-flex align-items-center justify-content-center';
    loadingElement.style.height = '100vh';
    loadingElement.innerHTML = `
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(loadingElement); // Exibe mensagem "Carregando..." no centro da página com três spinners do Bootstrap

    setTimeout(function() {
      window.location.href = 'index.html'; // Redireciona para a página principal após o temporizador de 2 segundos
    }, 2000);
  })
  .catch(function(error) {
    console.error(error);
  });
});
