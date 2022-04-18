var documento = document.body

function userNotFound() {
    localStorage.clear()

    while (documento.children.length > 0) {
        documento.removeChild(documento.lastChild);
    }

    cuteAlert({
        type: "error",
        title: "usuário não encontrado :(",
        message: "ocorreu um erro ao encontrar os dados do usúario, é necessario realizar o login novamente",
        buttonText: "okay"
    }).then(() => {
        window.location.assign("./login.html")
    })
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)

	if (!itemStr) {
		userNotFound() 
        return null
	}

	const item = JSON.parse(itemStr)
	const now = new Date()

    if (!!itemStr){
	if (now.getTime() > item.expiry) {
        userNotFound()
		return null
	}
	return item.value
}}

var tokenDoUsuario = getWithExpiry("@TOKEN");

function focus(){

    const inputs = document.querySelectorAll(".input");

    function addcl(){
	    let parent = this.parentNode.parentNode;
	    parent.classList.add("focus");
    }

    function remcl(){
	    let parent = this.parentNode.parentNode;
	    if(this.value == ""){
		    parent.classList.remove("focus");
	    }
    }

    inputs.forEach(input => {
	    input.addEventListener("focus", addcl);
	    input.addEventListener("blur", remcl);
    });
}
focus()

var tarefasPendentesUL = document.getElementsByClassName('tpul')
var tarefasTerminadasUL = document.getElementsByClassName('ttul')
var botao = document.getElementById('criarTarefa')
if (!!botao) {botao.style.cursor = "pointer"}
var user = document.getElementById('user-info')
var finalizarSessão = document.getElementById('exit')
var a;

var iconeCriarTarefa = `<svg width="32px" height="32px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>list--checked</title><rect x="16" y="8" width="14" height="2"/><polygon points="6 10.59 3.41 8 2 9.41 6 13.41 14 5.41 12.59 4 6 10.59"/><rect x="16" y="22" width="14" height="2"/><polygon points="6 24.59 3.41 22 2 23.41 6 27.41 14 19.41 12.59 18 6 24.59"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>`
var iconeAtualizarTarefa = `<svg width="28px" height="28px" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2.9166666666666665" d="M2.553 23.337C4.888 29.31 10.699 33.542 17.5 33.542C26.359 33.542 33.541 26.36 33.541 17.5M32.447 11.664C30.113 5.689 24.3 1.459 17.5 1.459C8.64 1.459 1.458 8.641 1.458 17.5M13.125 23.334L1.458 23.334L1.458 35M33.541 0L33.541 11.667L21.875 11.667"/></svg>`
var iconeDeletarTarefa = `<svg width="30px" height="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="774.266px" height="774.266px" viewBox="0 0 774.266 774.266" style="enable-background:new 0 0 774.266 774.266;"xml:space="preserve"><g><g><path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169zM285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/><rect x="475.031" y="286.593" width="48.418" height="396.942"/><rect x="363.361" y="286.593" width="48.418" height="396.942"/><rect x="251.69" y="286.593" width="48.418" height="396.942"/></g></g></svg>`
var iconeEditarTarefa = `<svg width="60px" height="60px"enable-background="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M494,256c0,131.4-106.6,238-238,238S18,387.4,18,256S124.6,18,256,18S494,124.6,494,256z" fill="transparent"/><g><path d="M157.5,331.8c4,60.4,75,66.3,89.4,26   c19.9-43.7,77.9-58,107.5-8.5" fill="#4DB6AC" stroke="#000" stroke-miterlimit="10" stroke-width="15"/><path d="M172,270.1l-7.2,7.3l-4,33.8l33.8-4l7.3-7.2   L305,196.8L275.1,167L172,270.1z" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="15"/><path d="M322.3,177.8L293.4,149l18.9-19   c1.8-1.9,4.9-1.9,6.9,0l22,22c1.9,1.8,1.9,4.9,0,6.9L322.3,177.8z" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="15"/></g></svg>`
var iconeConcluirEditar = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>`
var iconeCancelarEditar = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>`

if (!!finalizarSessão) {
finalizarSessão.addEventListener('click', () => cuteAlert({
    type: "question",
    title: "gostaria de finalizar sessão?",
    message: "vamos sentir sua falta :(",
    confirmText: "yes",
    cancelText: "nope"
  }).then((e)=>{
    if(e == "confirm"){
        localStorage.clear()
        window.location.assign("./login.html")
    }
  })
  )}


const bodyObject = {
    description : "",
    completed: false
  }

var nomeTarefa = document.getElementById('new-task');

//seção criar a tarefa
if (!!nomeTarefa) {
nomeTarefa.addEventListener('keypress', (key) => {
    if (key.key == "Enter"){
        key.preventDefault()
        criarTask()
    }
})}

if (!!botao) {
botao.addEventListener('click', (evento) => {
    evento.preventDefault();
    criarTask()
})}

function criarTask() {
    var taskName = nomeTarefa.value
    var taskNameBOLD = taskName.bold()
    var check = document.getElementById('i')

    if (!!taskName) {
       bodyObject.description = taskName;
    } else {
        cuteAlert({
            type: "error",
            title: "criação negada",
            message: "escreva o nome da tarefa antes de concluir",
            buttonText: "okay"
        })
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
        message: `objetivo: ${taskNameBOLD}`,
        confirmText: "okay",
        cancelText: "nope"
      }).then((e)=>{
        if(e == "confirm"){
            criarNovaTarefa()
        } else {nomeTarefa.value = "";}
      })
}
//seção criar a tarefa//

const BASE_URL_API = 'https://ctd-todo-api.herokuapp.com/v1';

const ListaDeTarefas = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
}

if (!!botao) {
pedirInformacoesDoUsuario()
pedirListaDeTarefasUsuario()}

function pedirInformacoesDoUsuario() {

    tokenDoUsuario = getWithExpiry("@TOKEN");
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

    tokenDoUsuario = getWithExpiry("@TOKEN");
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
    p2.id = `task${e}`
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
              var type = "question"; var novaCor = "#d85261"; colorBgCuteAlert (type, novaCor)
        })
        editarTask.addEventListener('click', () => {

            var aux = elementosLi.p2.innerText
            var textoTarefaBOLD = aux.bold()

            cuteAlert({
                type: "question",
                title: "refazer tarefa",
                message: `você quer refazer a tarefa: ${textoTarefaBOLD}?`,
                confirmText: "yes",
                cancelText: "nope"
              }).then((e)=>{
                if(e == "confirm"){
                    refazerTarefa(id)
                }
              })})
    } else {
        var id = li.classList[0]
        tarefasPendentesUL[0].appendChild(li)
        var campoTexto = document.getElementById(`task${e}`)
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
              var type = "question"; var novaCor = "#d85261"; colorBgCuteAlert (type, novaCor)
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

    tokenDoUsuario = getWithExpiry("@TOKEN");

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
            erroServidor()
        }
        })

}

function editarTarefa(idTarefa, campoTexto ,li) {

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
    concluirEdicao.innerHTML = iconeConcluirEditar
    var cancelarEdicao = document.createElement('div');
    cancelarEdicao.style.cursor = "pointer"
    cancelarEdicao.id = "cancelEdit"
    cancelarEdicao.classList.add('mf-div')
    cancelarEdicao.innerHTML = iconeCancelarEditar
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

    tokenDoUsuario = getWithExpiry("@TOKEN");

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
            erroServidor()
        }
        })
}

}

function deletarTarefa(idTarefa){

    var ID = parseInt(idTarefa)

    tokenDoUsuario = getWithExpiry("@TOKEN");

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
            erroServidor()
        }
    })
}

function tarefaPronta(idTarefa){

    var ID = parseInt(idTarefa)
    var tarefaDescription = Array.from(document.getElementsByClassName(idTarefa))

    var nomeTarefaDescription = tarefaDescription[0].children[1].innerHTML

    const bodyObject = {
        description: nomeTarefaDescription,
        completed: true
    }

    var bodyObjectEmJson = JSON.stringify(bodyObject)

    tokenDoUsuario = getWithExpiry("@TOKEN");

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
            erroServidor()
        }
        })

}

function criarNovaTarefa() {

    let bodyObjectEmJson = JSON.stringify(bodyObject);

    tokenDoUsuario = getWithExpiry("@TOKEN");

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

        var status = respostaDoServidor.status
        
        return status;
    })
    .then((status) => {
        if (status == 201) {
            document.location.reload()
        }
        if (status == 500) {
            erroServidor()
        }
    })
}

function erroServidor() {
    cuteAlert({
        type: "error",
        title: "erro de contato ao servidor",
        message: "tente novamente em momentos",
        buttonText: "okay"
    })
}

function elementoSmallErro(elementoRecebido) {
    elementoRecebido.style.color = "#E42323BF";
    elementoRecebido.style.fontSize = "8";
    elementoRecebido.style.fontWeight = "bold";
}