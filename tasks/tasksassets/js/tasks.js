//@@@@ CARREGA E ALTERA DADOS DO USUÁRIO LOGADO
//Usando Async-Await
async function buscaUsuarioNaApi(tokenJwtArmazenado) {
    //console.log(tokenJwtArmazenado);
    let urlGetUsuario = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

    let configuracaoRequisicao = {
        //method: 'GET', //Pode omitir o GET da configuração
        //body: objetoUsuarioCadastroJson, //Não precisa de body
        headers: {
            'Authorization': `${tokenJwtArmazenado}`, // é OBRIGATORIO passar essa informação
        },
    };
    let resposta;
    let respostaJson
    try {
        resposta = await fetch(urlGetUsuario, configuracaoRequisicao);

        if (resposta.status == 200) {
            respostaJson = await resposta.json();
            //console.log(respostaJson);
            alteraDadosUsuarioEmTela(respostaJson);
        } else {
            throw resposta.status
        }
    } catch (error) {
        let escolhaUsuario = confirm("Ocorreu algum erro ao buscar as informações do usuário logado")
        console.log(error);
        if (escolhaUsuario) {
            buscaUsuarioNaApi(cookieJwt);
        }
    }
}

function alteraDadosUsuarioEmTela(objetoUsuarioRecebido) {
    let nomeUsuarioEmTarefas = document.getElementById('nomeUsuarioEmTarefas');
    nomeUsuarioEmTarefas.innerText = `${objetoUsuarioRecebido.firstName} ${objetoUsuarioRecebido.lastName}`;
}

////@@@@ BUSCANDO TODAS AS TAREFAS DO USUÁRIO LOGADO
function buscaAsTarefasDoUsuario(tokenJwtArmazenado) {
    let urlGetTarefas = "https://ctd-todo-api.herokuapp.com/v1/tasks";
    let configuracaoRequisicao = {
        headers: {
            'Authorization': `${tokenJwtArmazenado}`, // é OBRIGATORIO passar essa informação
        },
    };

    fetch(urlGetTarefas, configuracaoRequisicao).then(
        resultado => {
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado.status;
        }
    ).then(
        resultado => {
            manipulandoTarefasUsuario(resultado);
        }
    ).catch(
        erros => {
            console.log(erros);
        }
    );
}

function manipulandoTarefasUsuario(listaDeTarefas) {
    //Formas de percorrer a lista obtida
    /* for (let tarefa of listaDeTarefas) {
        //console.log(tarefa);   
    }
    listaDeTarefas.forEach(tarefa => {
        console.log(tarefa);
    }); */
    //console.log(listaDeTarefas);

    //Se a lista de tarefas retornar vazia da api...
    if (listaDeTarefas.length == 0) {
        nenhumaTarefaPendenteEncontrada();
    //Se retornar algum registro da API...
    } else {
        //Ordenando a lista recebida da API
        listaDeTarefas = listaDeTarefas.sort(function (a, b) {
            return a.description.localeCompare(b.description);
        });

        listaDeTarefas.map(tarefa => {
            if (tarefa.completed) {
                renderizaTarefasConcluidas(tarefa);
            } else {
                renderizaTarefasPendentes(tarefa);
            }
        });

    }

}

///////

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Editar";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Deletar";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}