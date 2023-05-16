const urlBase = 'http://127.0.0.1:8000/signup'
const formulario = document.getElementById('register-form')

formulario.addEventListener('submit',(event) => {
    event.preventDefault();
  
    const formData = new FormData(formulario); // Cria um objeto FormData com os dados do formulário
    const url = urlBase ; // URL da API para cadastro de usuário
  
    console.log(formData.values())

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao cadastrar o usuário.');
      }
  
      console.log('Usuário cadastrado com sucesso!');
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
        window.location.href = 'login.html'; // Redireciona para a página de login após o temporizador de 2 segundos
      }, 2000);
    })
    .catch(function(error) {
      console.error(error);
    });
  });
  