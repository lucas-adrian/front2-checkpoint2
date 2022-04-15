
var tokenDoUsuario = localStorage.getItem("@TOKEN")

var documento = document.body
var tarefasPendentesUL = document.getElementsByClassName('tpul')
var tarefasTerminadasUL = document.getElementsByClassName('ttul')
var botao = document.getElementById('criarTarefa')
botao.style.cursor = "pointer"
var user = document.getElementById('user-info')
var finalizarSessão = document.getElementById('exit')

var iconeCriarTarefa = `<svg width="33px" height="33px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z" fill="green" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
var iconeAtualizarTarefa = `<svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8V17H33" fill="green" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
var iconeDeletarTarefa = `<svg width="30px" height="40px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M33 6H44L15 42H4L33 6Z" fill="red" stroke="black" stroke-width="2" stroke-linejoin="round"/><path d="M15 6H4L33 42H44L15 6Z" fill="red" stroke="black" stroke-width="2" stroke-linejoin="round"/></svg>`
var iconeEditarTarefa = `<svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z" fill="green" stroke="black" stroke-width="4" stroke-linejoin="round"/></svg>`

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
  })
  )


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

    if (check.checked) {
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

                    descricao = document.createTextNode(e.description)
                    criacao = document.createTextNode(`${DD}/${MM}/${YYYY}`)
                    completo = e.completed
                    var id = e.id

                    carregarTarefas(descricao, criacao, completo, id)
                })
            });

}

function carregarTarefas(b,c,d,e){

    const elementosLi = {
        li,
        tarefaConcluida,
        p2,
        p3,
        right
    }

    var li = document.createElement('li');

    li.classList.add(e)

    var tarefaConcluida = document.createElement('div');
    tarefaConcluida.innerHTML = iconeCriarTarefa
    tarefaConcluida.classList.add(e)
    
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');

    var right = document.createElement('div');
    right.classList.add('tpRight')

    var editarTask = document.createElement('div');
    editarTask.innerHTML = iconeEditarTarefa

    var excluirTask = document.createElement('div');
    excluirTask.innerHTML = iconeDeletarTarefa
    p2.id = "taskName"
    p3.id = "created"

    right.appendChild(editarTask)
    right.appendChild(excluirTask)

    elementosLi.li = li;
    elementosLi.p2 = p2;
    elementosLi.p3 = p3;
    elementosLi.right = right;
    elementosLi.tarefaConcluida = tarefaConcluida

    p2.appendChild(b);
    p3.appendChild(c)
    li.appendChild(tarefaConcluida)
    li.appendChild(p2)
    li.appendChild(p3)
    li.appendChild(right)

    if (d){
        editarTask.innerHTML = iconeAtualizarTarefa
        var id = li.classList[0]
        li.removeChild(tarefaConcluida)
        li.removeChild(p3)
        tarefasTerminadasUL[0].appendChild(li)
        editarTask.style.cursor = 'pointer'
        excluirTask.style.cursor = 'pointer'
        excluirTask.addEventListener('click', () => {deletarTarefa(id)})
        editarTask.addEventListener('click', () => {refazerTarefa(id)})
    } else {
        var id = li.classList[0]
        tarefasPendentesUL[0].appendChild(li)
        var campoTexto = document.getElementById('taskName')
        tarefaConcluida.style.cursor = 'pointer'
        editarTask.style.cursor = 'pointer'
        excluirTask.style.cursor = 'pointer'

        tarefaConcluida.addEventListener('click', () => {
            
            var aux = elementosLi.p2.innerText
            var textoTarefaBOLD = aux.bold()

            cuteAlert({
                type: "question",
                title: "finalizar objetivo",
                message: `você concluiu a tarefa: ${textoTarefaBOLD}?`,
                confirmText: "yes",
                cancelText: "nope"
              }).then((e)=>{
                  
                  
                if(e == "confirm"){
                    tarefaPronta(id)
                }
              })
        })

        excluirTask.addEventListener('click', () => {
            
            var aux = elementosLi.p2.innerText
            var textoTarefaBOLD = aux.bold()

            cuteAlert({
                type: "question",
                title: "deletar objetivo",
                message: `deletar a tarefa: ${textoTarefaBOLD}?`,
                confirmText: "yes",
                cancelText: "nope"
              }).then((e)=>{
                  

                  
                if(e == "confirm"){
                    deletarTarefa(id)
                }
              })
        })

        editarTask.addEventListener('click', () => {editarTarefa(id, campoTexto, li)})
    }

function refazerTarefa(idTarefa){

    var ID = parseInt(idTarefa)

    var tarefaDescription = Array.from(document.getElementsByClassName(idTarefa))

    var nomeTarefaDescription = tarefaDescription[0].innerText

    const bodyObject = {
        description: nomeTarefaDescription,
        completed: false
    }

    var bodyObjectEmJson = JSON.stringify(bodyObject)

    let configuracoesRequisicao = {
        method: 'PUT',
        body: bodyObjectEmJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenDoUsuario
        },
    }

    fetch(`${BASE_URL_API}/tasks/${ID}`, configuracoesRequisicao)
    .then((respostaDoServidor) => {

        let status = respostaDoServidor.status
        return status;

    }).then( (status) => {
        if (status == 200) {
            window.location.reload()
        }
        if (status == 500) {
            alert("erro no servidor, tente novamente")
        }
        })

}

function editarTarefa(idTarefa, campoTexto,li) {

    var aux = elementosLi.p2.innerText
    var textoTarefaBOLD = aux.bold()

    while (li.firstChild) {
        li.removeChild(li.lastChild);}

    var nomeTarefa = campoTexto.innerHTML
    campoTexto.innerHTML = "";
    var input = document.createElement('input')
    input.classList.add('new-task')
    input.id = 'taskInput'
    input.type = 'text'
    input.placeholder = nomeTarefa
    var concluirEdicao = document.createElement('div');
    concluirEdicao.style.cursor = "pointer"
    concluirEdicao.id = "confirmEdit"
    concluirEdicao.classList.add('mf-div')
    concluirEdicao.innerHTML = iconeCriarTarefa
    var cancelarEdicao = document.createElement('div');
    cancelarEdicao.style.cursor = "pointer"
    cancelarEdicao.id = "cancelEdit"
    cancelarEdicao.classList.add('mf-div')
    cancelarEdicao.innerHTML = iconeDeletarTarefa
    li.appendChild(input)
    li.appendChild(concluirEdicao)
    li.appendChild(cancelarEdicao)

    concluirEdicao.addEventListener('click', () => {
            
        var inputBOLD = input.value.bold()

        if (!!input.value === false) {
            cuteAlert({
                type: "error",
                title: "alteração negada",
                message: "escreva o novo nome da tarefa antes de concluir",
                buttonText: "okay"
            })
            return
        }

        if (input.value == nomeTarefa) {
            cuteAlert({
                type: "error",
                title: "alteração negada",
                message: "escreva um novo nome para a tarefa",
                buttonText: "okay"
            })
            return
        }

        if (input.value != nomeTarefa && input.value != "") {

            cuteAlert({
                type: "question",
                title: "alterar objetivo",
                message: `alterar o nome da tarefa de ${textoTarefaBOLD} para ${inputBOLD}?`,
                confirmText: "yes",
                cancelText: "nope"
            }).then((e)=>{

                if(e == "confirm"){
                    alterarTasks(idTarefa, input)
                }
            })

            var type = "question"; var novaCor = "#2dd284"; colorBgCuteAlert (type, novaCor)
        }
    })

    cancelarEdicao.addEventListener('click', () => {resetaLi(input, concluirEdicao, cancelarEdicao, li, nomeTarefa, campoTexto)})
}

function colorBgCuteAlert (type, novaCor) {
    var alertHeader = document.getElementsByClassName(`${type}-bg`)[0];
    alertHeader.style.background = novaCor
}

function resetaLi(input, concluirEdicao, cancelarEdicao, li, nomeTarefa, campoTexto) {

    var e = elementosLi

    li.removeChild(input)
    li.removeChild(concluirEdicao)
    li.removeChild(cancelarEdicao)

    li.appendChild(e.tarefaConcluida)
    li.appendChild(e.p2)
    li.appendChild(e.p3)
    li.appendChild(e.right)

    campoTexto.innerHTML = nomeTarefa;

}

function alterarTasks(idTarefa, input){

    var ID = parseInt(idTarefa)

    const bodyObject = {
        description: input.value,
        completed: false
    }

    var bodyObjectEmJson = JSON.stringify(bodyObject)

    let configuracoesRequisicao = {
        method: 'PUT',
        body: bodyObjectEmJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenDoUsuario
        },
    }

    fetch(`${BASE_URL_API}/tasks/${ID}`, configuracoesRequisicao)
    .then((respostaDoServidor) => {

        let status = respostaDoServidor.status
        return status;

    }).then( (status) => {
        if (status == 200) {
            window.location.reload()}
        if (status == 500) {
            alert("erro no servidor, tente novamente")
        }
        })
}

}

function deletarTarefa(idTarefa){

    var ID = parseInt(idTarefa)

    let configuracoesRequisicao = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenDoUsuario
        },
    }

    fetch(`${BASE_URL_API}/tasks/${ID}`, configuracoesRequisicao)
    .then((respostaDoServidor) => {

        let status = respostaDoServidor.status
        return status;

    }).then( (status) => {
        if (status == 200) {
            window.location.reload()}
        if (status == 500) {
            alert("erro no servidor, tente novamente")
        }
    })
}

function tarefaPronta(idTarefa){

    var ID = parseInt(idTarefa)

    // console.log(ID)
    var tarefaDescription = Array.from(document.getElementsByClassName(idTarefa))

    var nomeTarefaDescription = tarefaDescription[0].children[1].innerHTML

    const bodyObject = {
        description: nomeTarefaDescription,
        completed: true
    }

    var bodyObjectEmJson = JSON.stringify(bodyObject)

    let configuracoesRequisicao = {
        method: 'PUT',
        body: bodyObjectEmJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenDoUsuario
        },
    }

    fetch(`${BASE_URL_API}/tasks/${ID}`, configuracoesRequisicao)
    .then((respostaDoServidor) => {

        let status = respostaDoServidor.status
        return status;

    }).then( (status) => {
        if (status == 200) {
            window.location.reload()}
        if (status == 500) {
            alert("erro no servidor, tente novamente")
        }
        })

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

<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>

