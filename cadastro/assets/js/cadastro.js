let campoNomeCadastro = document.getElementById("InputName");
let campoSobrenomeCadastro = document.getElementById("InputSobrenome");
let campoEmailCadastro = document.getElementById("InputEmail1");
let campoSenhaCadastro = document.getElementById("password");
let campoRepetirSenhaCadastro = document.getElementById("confirm_password");
let botaoCriarConta = document.getElementById("criarContaCadastro");

function validatePassword(){
    if(campoSenhaCadastro.value != campoRepetirSenhaCadastro.value) {
        campoRepetirSenhaCadastro.setCustomValidity("Senhas diferentes!")
        return false;
    } else {
        campoRepetirSenhaCadastro.setCustomValidity('');
        return true
    }
}

const usuarioObjetoCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function cadastroSucesso(jsonRecebido) {
    console.log("Json recebido ao cadastrar");
    console.log(jsonRecebido);
    alert("Usuário cadastrado com sucesso")
    window.location.pathname = "/front2-checkpoint2/login/login.html"
}

function cadastroErro(statusRecebido) {
    console.log("Erro ao cadastrar");
    console.log(statusRecebido);
}

botaoCriarConta.addEventListener('click', evento => {
    evento.preventDefault();
    var senhaValidada = validatePassword()

    if (campoNomeCadastro.value != "" && campoSobrenomeCadastro.value != "" &&
        campoEmailCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoRepetirSenhaCadastro.value != "" && senhaValidada) {

        usuarioObjetoCadastro.firstName = campoNomeCadastro.value;
        usuarioObjetoCadastro.lastName = campoSobrenomeCadastro.value;
        usuarioObjetoCadastro.email = campoEmailCadastro.value;
        usuarioObjetoCadastro.password = campoSenhaCadastro.value;

        let objetoUsuarioCadastroJson = JSON.stringify(usuarioObjetoCadastro);

        let configuracaoRequisicao = {
            method: 'POST',
            body: objetoUsuarioCadastroJson,
            headers: {
                'Content-type': 'application/json',
            },
        };

        fetch("https://ctd-todo-api.herokuapp.com/v1/users", configuracaoRequisicao)
        .then((response) => {
            if (response.status == 201) {
                return response.json()
            } throw response;
        })
        .then(function (resposta) {
            cadastroSucesso(resposta.jwt)
        })
        .catch(error => {
            cadastroErro(error)
        });
    } else {
        alert("Todos os campos devem ser preenchidos para que possa prosseguir")
    }
});

