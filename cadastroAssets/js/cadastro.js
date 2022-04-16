var campoNomeCadastro = document.getElementById("InputName");
var campoSobrenomeCadastro = document.getElementById("InputSobrenome");
var campoEmailCadastro = document.getElementById("InputEmail");
var campoSenhaCadastro = document.getElementById("password");
var campoRepetirSenhaCadastro = document.getElementById("confirm_password");
var botaoCriarConta = document.getElementById("criarContaCadastro");
var mainForm = document.getElementById('main-form');
var t;
var m;

const usuarioObjetoCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function validatePassword(senha, conSenha){
    if(senha != conSenha) {
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

function cadastroSucesso() {
    cuteAlert({
        type: "success",
        title: "cadastro realizado com sucesso!",
        message: "vamos te redirecionar para o login :)",
        buttonText: "okay"
    })
    var botao = document.getElementsByClassName('alert-button')
    botao[0].addEventListener('click', () => {window.location.assign("./login.html")})
}

function emailNorm(emailValue) {
    var a = emailValue.replace(/\s+/g, '').toLowerCase()
    return a
}

function simpleValidateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function callCuteAlert(t, m) {
    cuteAlert({
        type: "warning",
        title: t,
        message: m,
        buttonText: "okay"
    })
}

function criarConta(evento) {

    evento.preventDefault();

    var nome = campoNomeCadastro.value;
    var sobrenome = campoSobrenomeCadastro.value
    var email = emailNorm(campoEmailCadastro.value);
    var senha = campoSenhaCadastro.value
    var conSenha = campoRepetirSenhaCadastro.value

    var senhaValidada = validatePassword(senha, conSenha);
    var emailValidado = simpleValidateEmail(email)

    if (nome != "" && sobrenome != "" && email != "" && senha != "" && conSenha != "") {

        if (senhaValidada === false) {
            t = "senhas não conferem";
            m = "sua senha não é igual a sua confirmação de senha"
            callCuteAlert(t, m)
            return
        }

        if (emailValidado === false) {
            t = "email invalido";
            m = "insira um email valido"
            callCuteAlert(t, m)
            return
        }

        usuarioObjetoCadastro.firstName = nome;
        usuarioObjetoCadastro.lastName = sobrenome;
        usuarioObjetoCadastro.email = email;
        usuarioObjetoCadastro.password = senha;

        var objetoUsuarioCadastroJson = JSON.stringify(usuarioObjetoCadastro);

        let configuracaoRequisicao = {
            method: 'POST',
            body: objetoUsuarioCadastroJson,
            headers: {
                'Content-type': 'application/json',
            },
        };

        fetch("https://ctd-todo-api.herokuapp.com/v1/users", configuracaoRequisicao)
        .then((response) => {
            if (!!response) {return response}
        })
        .then(function (response) {

            if (response.status == 201) {
                cadastroSucesso()
                return
            }

            if (response.status == 400) {

                campoEmailCadastro.value = ""
                
                cuteAlert({
                    type: "warning",
                    title: "email já cadastrado",
                    message: "criar uma nova conta ou fazer login?",
                    buttonText: "nova conta"
                })

                var alertBody = document.getElementsByClassName('alert-body')

                var botao2 = document.createElement('button');
                    botao2.className = 'alert-button success-bg success-btn';
                    botao2.style.marginTop = '10px';
                    botao2.innerHTML = 'fazer login'
                ;

                alertBody[0].appendChild(botao2)

                botao2.addEventListener('click', () => {window.location.assign("./login.html")})
            }
        })
    } else {
        t = "campos incompletos";
        m = "todos os campos devem ser preenchidos para realizar o cadastro";
        callCuteAlert(t, m);
        return
    }
};

botaoCriarConta.addEventListener('click', criarConta)
mainForm. addEventListener('keypress', (evento) => {
    if (evento.key == "Enter") {
        criarConta(evento)
    }
})