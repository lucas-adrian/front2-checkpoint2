
var tokenDoUsuario = localStorage.getItem("@TOKEN")

var documento = document.body
var tarefasPendentesUL = document.getElementsByClassName('tpul')
var tarefasTerminadasUL = document.getElementsByClassName('ttul')
var botao = document.getElementById('criarTarefa')
var user = document.getElementById('user')
var finalizarSessão = document.getElementById('exit')

var iconeCriarTarefa = `<svg width="33px" height="33px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z" fill="green" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
var iconeAtualizarTarefa = `<svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="green" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8V17H33" fill="green" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
var iconeDeletarTarefa = `<svg width="30px" height="40px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M33 6H44L15 42H4L33 6Z" fill="red" stroke="black" stroke-width="2" stroke-linejoin="round"/><path d="M15 6H4L33 42H44L15 6Z" fill="red" stroke="black" stroke-width="2" stroke-linejoin="round"/></svg>`

finalizarSessão.addEventListener('click', () => cuteAlert({
    type: "question",
    title: "gostaria de finalizar sessão?",
    message: "vamos sentir sua falta :(",
    confirmText: "yes",
    cancelText: "nope"
  }).then((e)=>{
    if(e == "confirm"){
        localStorage.clear()
        window.location.pathname = "front2-checkpoint2/login/login.html"
    }
  }))


const bodyObject = {
    description : "",
    completed: false
  }

botao.addEventListener('click', (evento) => {
    evento.preventDefault();

    var nomeTarefa = document.getElementById('new-task').value
    var check = document.getElementById('i')

    if (!!nomeTarefa) {
       bodyObject.description = nomeTarefa;
       nomeTarefa = "";
    } else {
        let inputNovaTarefa = document.getElementById("new-task");
        elementoSmallErro(inputNovaTarefa)
        inputNovaTarefa.innerText = "Campo obrigatorio";
        return
    }

    if (check) {
        bodyObject.completed = false
    } else {
        bodyObject.completed = true
    }
    
    cuteAlert({
        type: "question",
        title: "confirmar criação?",
        message: `objetivo: ${bodyObject.description}`,
        confirmText: "okay",
        cancelText: "nope"
      }).then((e)=>{
        if(e == "confirm"){
            criarNovaTarefa()
        } else {evento.path[1][0].value = ""}
      })
})


const BASE_URL_API = 'https://ctd-todo-api.herokuapp.com/v1';

const ListaDeTarefas = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
}

pedirInformacoesDoUsuario()
pedirListaDeTarefasUsuario()

function pedirInformacoesDoUsuario() {

    // Configurações da requisição GET.
    let configuracoesRequisicao = {
        method: 'GET',
        headers: {
            'authorization': tokenDoUsuario
        },
    }

    // Requisição para retorno dos dados de cadastro do usuário.
    fetch(`${BASE_URL_API}/users/getMe`, configuracoesRequisicao)
        .then(function (respostaDoServidor) {
                
            // Retorno apenas dos dados convertidos em JSON.
            let JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
            // Apresentando resultado final no console.log().
            // console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);
            console.log(respostaDoServidorEmJSON)

            user.innerHTML = `Olá, ${respostaDoServidorEmJSON.firstName} ${respostaDoServidorEmJSON.lastName}`

        });

}

function pedirListaDeTarefasUsuario() {

    // Configurações da requisição GET.
    let configuracoesRequisicao = {
        method: 'GET',
        headers: {
            'authorization': tokenDoUsuario
        },
    }

    // Requisição para retorno dos dados de cadastro do usuário.
    fetch(`${BASE_URL_API}/tasks`, configuracoesRequisicao)
        .then(function (respostaDoServidor) {

            // Retorno apenas dos dados convertidos em JSON.
            let JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
                // Apresentando resultado final no console.log().
                // console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);

                // console.log(respostaDoServidorEmJSON)
                var arrayTarefas = respostaDoServidorEmJSON
                arrayTarefas.forEach(e => {



                    var date = e.createdAt
                    var YYYY = date.substr(0, 4)
                    var MM = date.substr(5, 2)
                    var DD = date.substr(8, 2)



                    idNode = document.createTextNode(`ID: ${e.id}`)
                    descricao = document.createTextNode(e.description)
                    criacao = document.createTextNode(`${DD}/${MM}/${YYYY}`)
                    completo = e.completed
                    var id = e.id

                    carregarTarefas(idNode, descricao, criacao, completo, id)
                })
            });

}

function carregarTarefas(a,b,c,d,e){

    var li = document.createElement('li');

    var taskSymble1 = document.createElement('div');
    taskSymble1.innerHTML = iconeCriarTarefa
    taskSymble1.id = "taskDone";
    taskSymble1.classList.add(e)

    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');

    var right = document.createElement('div');
    right.classList.add('tpRight')

    var taskSymble2 = document.createElement('div');
    taskSymble2.innerHTML = iconeAtualizarTarefa
    taskSymble2.id = "edit";
    taskSymble2.classList.add(e)

    var taskSymble3 = document.createElement('div');
    taskSymble3.innerHTML = iconeDeletarTarefa
    taskSymble3.id = "delete";
    taskSymble3.classList.add(e)

    right.appendChild(taskSymble2)
    right.appendChild(taskSymble3)


    p1.id = "taskID"
    p2.id = "taskName"
    p3.id = "created"
    p1.appendChild(a);
    p2.appendChild(b);
    p3.appendChild(c)
    li.appendChild(taskSymble1)
    li.appendChild(p1)
    li.appendChild(p2)
    li.appendChild(p3)
    li.appendChild(right)

    if (d){
        li.removeChild(taskSymble1)
        li.removeChild(p1)
        li.removeChild(p3)
        tarefasTerminadasUL[0].appendChild(li)
    } else {
        tarefasPendentesUL[0].appendChild(li)
    }

}

function criarNovaTarefa() {

    let bodyObjectEmJson = JSON.stringify(bodyObject);

    let configuracoesRequisicao = {
        method: 'POST',
        body: bodyObjectEmJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenDoUsuario
        }
    }

    fetch(`${BASE_URL_API}/tasks`, configuracoesRequisicao)
    .then(function (respostaDoServidor) {

        // Retorno apenas dos dados convertidos em JSON.
        let JSON = respostaDoServidor.json();

        // Retorno da promessa convertida em JSON.
        return JSON;
    })
    .then(function () {
        document.location.reload()
    })
}

function elementoSmallErro(elementoRecebido) {
    elementoRecebido.style.color = "#E42323BF";
    elementoRecebido.style.fontSize = "8";
    elementoRecebido.style.fontWeight = "bold";
}