localStorage.clear()

var form = document.getElementById('formLogin');
var inputEmail = document.getElementById('InputEmail');
var inputSenha = document.getElementById('password');
var botaoLogin = document.getElementsByClassName('botao')
var email;
var senha;
var t;
var m;

const BASE_URL_API = 'https://ctd-todo-api.herokuapp.com/v1';

const credenciais = {
    email : "",
    password : ""
}

function emailNorm(emailValue) {
    var a = emailValue.replace(/\s+/g, '').toLowerCase()
    return a
}

function setWithExpiry(key, value, ttl) {

	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}

	localStorage.setItem(key, JSON.stringify(item))
}

function callCuteAlert(t, m) {
    cuteAlert({
        type: "error",
        title: t,
        message: m,
        buttonText: "okay"
    })
}

function login(e) {

    e.preventDefault()

    email = emailNorm(inputEmail.value);
    senha = inputSenha.value;

    credenciais.email = email;
    credenciais.password = senha;

    var credString = JSON.stringify(credenciais)
    var s;

    let configuracoesRequisicao = {
        method: 'POST',
        body: credString,
        headers: {
            'Content-type': 'application/json'
        }
    }
    
    fetch(`${BASE_URL_API}/users/login`, configuracoesRequisicao)
    .then(function (respostaDoServidor) {

        let resposta = respostaDoServidor
        s = resposta.status 
        return resposta.json()

    }) 
    .then((resposta) => {

        var j = resposta.jwt

        if (inputEmail.value == "" || inputSenha.value == "") {
            t = "dados incompletos";
            m = "insira email e senha para fazer login"
            callCuteAlert(t, m)
            return
        }

        if (s == 201) {
            setWithExpiry("@TOKEN", j, 1200000)
            window.location.assign("./tasks.html")
            return
        }

        if (s == 400) {
            inputSenha.value = "";
            t = "senha incorreta";
            m = "reinsira a senha e tente novamente"
            callCuteAlert(t, m)
            return
        }

        if (s == 404) {
            inputEmail.value = "";
            inputSenha.value = "";
            t = "email inexistente";
            m = "reinsira seus dados e tente novamente"
            callCuteAlert(t, m)
            return
        }

        if (s == 500) {
            inputEmail.value = "";
            inputSenha.value = "";
            t = "erro no servidor";
            m = "tivemos problemas na conexão com o servidor, tente novamente"
            callCuteAlert(t, m)
        }
    });
}

form.addEventListener('keypress', (key) => {
    if (key.key ==  "Enter"){
        login(key)
    }
})

botaoLogin[0].addEventListener('click', login)