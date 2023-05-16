const urlBase = 'http://127.0.0.1:8000/signup'
const formulario = document.getElementById('register-form')
const container = document.getElementById('container')

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
        window.location.href = 'login.html'; // Redireciona para a página de login após o temporizador de 2 segundos
      }, 1000);
    })
    .catch(function(error) {
      console.error(error);
    });
  });
  