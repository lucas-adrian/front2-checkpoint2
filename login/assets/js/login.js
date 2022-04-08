function retiraEspacosDeUmValorInformado(valorRecebido) {
    return valorRecebido.trim();
}
  
function converteValorRecebidoParaMinusculo(valorRecebido) {
    return valorRecebido.toLowerCase();
}
  
function validaEmailRecebido(emailRecebido) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRecebido)) {
      return true;
    } else {
      return false;
    }
}
  
  
function elementoSmallErro(elementoRecebido) {
    elementoRecebido.style.color = "#E42323BF";
    elementoRecebido.style.fontSize = "8";
    elementoRecebido.style.fontWeight = "bold";
}

let campoEmailLogin = document.getElementById("InputEmail1");
let campoSenhaLogin = document.getElementById("password");
let botaoAcessarLogin = document.getElementById("buttonAccess");
let formularioLogin = document.getElementById("formLogin");
let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;
let emailValidacoesOk = false;
let senhaValidacoesOk = false;
let loginApiValidacao = true;

botaoAcessarLogin.setAttribute("disabled", true);
botaoAcessarLogin.innerText = "Bloqueado";

const loginUsuario = {
  email: "",
  password: "",
};

botaoAcessarLogin.addEventListener("click", function (evento) {
    if (validaTelaDeLogin()) {
        evento.preventDefault();

        campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(
            campoEmailLogin.value
        );

        campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(
            campoSenhaLogin.value
        );

        campoEmailLoginNormalizado = converteValorRecebidoParaMinusculo(
            campoEmailLoginNormalizado
        );

        campoSenhaLoginNormalizado = converteValorRecebidoParaMinusculo(
            campoSenhaLoginNormalizado
        );

        loginUsuario.email = campoEmailLoginNormalizado;
        loginUsuario.password = campoSenhaLoginNormalizado;

        let loginUsuarioEmJson = JSON.stringify(loginUsuario);

        let configuracoesRequisicao = {
            method: 'POST',
            body: loginUsuarioEmJson,
            headers: {
                'Content-type': 'application/json',
            },
        }

        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", configuracoesRequisicao)
        .then((response) => {
            if (response.status == 201) {
                return response.json()
            } throw response;
        })
        .then(function (resposta) {
            loginSucesso(resposta.jwt)
        })
        .catch(error => {
            loginErro(error.status)
        });

        function loginSucesso(jwtRecebido) {
            document.cookie = `jwt=${jwtRecebido}`;
            window.location.pathname = "/front2-checkpoint2/tasks/tasks.html"
        }

        function loginErro(statusRecebido) {
            let loginValidacao = document.getElementById("loginValidacao");
            elementoSmallErro(loginValidacao);
            campoSenhaLogin.value = "";
            console.log(statusRecebido);
            if (statusRecebido == 400 || statusRecebido == 404) {
                console.log("Ocorreu algum erro, verifique o e-mail e/ou senha");
                loginValidacao.innerHTML = "Ocorreu algum erro, verifique o e-mail e/ou senha";
                loginApiValidacao = false;
            } else {
                loginApiValidacao = true;
            }
            validaTelaDeLogin();
        }

    } else {
        evento.preventDefault();
        alert("Ambos campos devem ser preenchidos");
    }
});

function resetaValidacaoLoginErro() {
    loginValidacao.innerHTML = "";
    botaoAcessarLogin.removeAttribute("disabled");
    botaoAcessarLogin.innerText = "Acessar";
    loginApiValidacao = true;
}

campoEmailLogin.addEventListener("blur", function () {
    let inputEmailValidacao = document.getElementById("inputEmailValidacao");
    campoEmailLogin.style.border = `1px solid #E42323BF`;

    elementoSmallErro(inputEmailValidacao);

    let emailEValido = validaEmailRecebido(campoEmailLogin.value);

    if (!emailEValido && campoEmailLogin.value != "") {
        inputEmailValidacao.innerText = "E-mail inválido";
        emailValidacoesOk = false;
    } else if (!emailEValido && campoEmailLogin.value == "") {
        inputEmailValidacao.innerText = "Campo obrigatorio";
        emailValidacoesOk = false;
    } else {
        inputEmailValidacao.innerText = "";
        campoEmailLogin.style.border = ``;
        emailValidacoesOk = true;
    }

  validaTelaDeLogin();
});

campoSenhaLogin.addEventListener("blur", function () {
    let inputPasswordValidacao = document.getElementById("inputPasswordValidacao");
    campoSenhaLogin.style.border = `1px solid #E42323BF`;
    elementoSmallErro(inputPasswordValidacao);

    if (campoSenhaLogin.value == "") {
        inputPasswordValidacao.innerText = "Campo obrigatorio";
        senhaValidacoesOk = false;
    } else {
        inputPasswordValidacao.innerText = "";
        campoSenhaLogin.style.border = ``;
        senhaValidacoesOk = true;
    }

    resetaValidacaoLoginErro();
    validaTelaDeLogin();
});


function validaTelaDeLogin() {
    if (!emailValidacoesOk || !senhaValidacoesOk || !loginApiValidacao) {
        botaoAcessarLogin.setAttribute("disabled", true);
        botaoAcessarLogin.innerText = "Bloqueado";
        return false;
    } else {
        botaoAcessarLogin.removeAttribute("disabled");
        botaoAcessarLogin.innerText = "Acessar";
        return true;
    }
}
