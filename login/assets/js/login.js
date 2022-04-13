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

const BASE_URL_API = 'https://ctd-todo-api.herokuapp.com/v1';

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

        fetch(`${BASE_URL_API}/users/login`, configuracoesRequisicao)
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
            // document.cookie = `jwt=${jwtRecebido}`;
            localStorage.setItem("@TOKEN", jwtRecebido)
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

//foco no campo senha
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

// function autenticarUsuario(credenciaisDoUsuario) {

//     // Configurações da requisição POST.
//     let configuracoes = {
//         method: 'POST',
//         body: JSON.stringify(credenciaisDoUsuario),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }

//     // Requisição de autenticação do usuário.
//     fetch(`${BASE_URL_API}/users/login/`, configuracoes)
//         .then(function (respostaDoServidor) {
                
//             // Retorno apenas dos dados convertidos em JSON.
//             let JSON = respostaDoServidor.json();

//             // Retorno da promessa convertida em JSON.
//             return JSON;
//         })
//         .then(function (respostaDoServidorEmJSON) {
            
//             // Capturando o retorno token JWT do Servidor.
//             let tokenDoUsuario = respostaDoServidorEmJSON.jwt;

//             // localStorage.setItem("@TOKEN", tokenDoUsuario)

//             // Apresentando resultado final no console.log().
//             console.log(`POST autenticarUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);

//         });
// }

// Requisição dos dados de cadastro do Usuário.
// pedirInformacoesDoUsuario(tokenDoUsuario);

/**
//  * Pedi os dados de cadastro do usuário.
//  * @param {string} tokenDoUsuario Token JWT da autenticação do usuário.
//  */
// function pedirInformacoesDoUsuario(tokenDoUsuario) {

//     // Configurações da requisição GET.
//     let configuracoes = {
//         method: 'GET',
//         headers: {
//             'authorization': tokenDoUsuario
//         },
//     }

//     // Requisição para retorno dos dados de cadastro do usuário.
//     fetch(`${BASE_URL_API}/users/getMe/`, configuracoes)
//         .then(function (respostaDoServidor) {
                
//             // Retorno apenas dos dados convertidos em JSON.
//             let JSON = respostaDoServidor.json();

//             // Retorno da promessa convertida em JSON.
//             return JSON;
//         })
//         .then(function (respostaDoServidorEmJSON) {
            
//             // Apresentando resultado final no console.log().
//             console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);

//         });

// }
