let campoNomeCadastro = document.getElementById("InputName");
let campoSobrenomeCadastro = document.getElementById("InputSobrenome");
let campoEmailCadastro = document.getElementById("InputEmail1");
let campoSenhaCadastro = document.getElementById("password");
let campoRepetirSenhaCadastro = document.getElementById("confirm_password");
let botaoCriarConta = document.getElementById("criarContaCadastro");

function validatePassword(){
    if(campoSenhaCadastro.value != campoRepetirSenhaCadastro.value) {
        return false;
    } else {
        return true
    }
}

function validaEmailRecebido(emailRecebido) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRecebido)) {
      return true;
    } else {
      return false;
    }
}

const usuarioObjetoCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function cadastroSucesso() {
    cuteAlert({
        type: "success",
        title: "cadastro realizado com sucesso!",
        message: "vamos te redirecionar para o login :)",
        buttonText: "okay"
    })
    var botao = document.getElementsByClassName('alert-button')
    botao[0].addEventListener('click', () => {window.location.pathname = "/front2-checkpoint2/login/login.html"})
}

function cadastroErro(error) {
    if (error.status == 400) {
    console.log("nada de bad request não, email já cadastrado")};
}

botaoCriarConta.addEventListener('click', evento => {

    evento.preventDefault();
    var senhaValidada = validatePassword()
    var emailValidado = validaEmailRecebido(campoEmailCadastro.value);

    if (campoNomeCadastro.value != "" && campoSobrenomeCadastro.value != "" &&
        campoEmailCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoRepetirSenhaCadastro.value != "") {

        if (senhaValidada === false) {
            cuteAlert({
                type: "warning",
                title: "senhas não conferem",
                message: "sua senha não é igual a sua confirmação de senha",
                buttonText: "okay"
            })
            return
        }

        if (emailValidado === false) {
            cuteAlert({
                type: "warning",
                title: "email invalido",
                message: "insira um email valido",
                buttonText: "okay"
            })
            return
        }

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

            if (response.status = 400) {
                console.log('nada de bad request não, email fornecido já está cadastrado')
            }

            if (!!response) {return response}
        
        })
        .then(function (response) {

            if (response.status == 400) {
                cuteAlert({
                    type: "warning",
                    title: "email já cadastrado",
                    message: "criar uma nova conta ou fazer login?",
                    buttonText: "nova conta"
                })
                
                alertBody = [];

                var alertBody = document.getElementsByClassName('alert-body')

                var botao2 = document.createElement('button')
                botao2.classList.add ('alert-button')
                botao2.classList.add ('success-bg')
                botao2.classList.add ('success-btn')
         
                botao2.style.marginTop = '10px'
                botao2.innerHTML = 'fazer login'

                alertBody[0].appendChild(botao2)
                botao2.addEventListener('click', () => {window.location.pathname = "/front2-checkpoint2/login/login.html"})
                campoEmailCadastro.value = ""
            }

            if (response.status == 201) {
            cadastroSucesso()}

        })
        .catch(response => {
            console.log(response)
            cadastroErro(response)
        });
    } else {
        cuteAlert({
            type: "error",
            title: "campos incompletos",
            message: "todos os campos devem ser preenchidos para realizar o cadastro",
            buttonText: "okay"
        })
          return
    }
});