var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function validaTelaDeLogin() {
    //Se ambos algum dos campos não forem válido
    if (!emailValidacoesOk || !senhaValidacoesOk || !loginApiValidacao) {
      botaoAcessarLogin.setAttribute("disabled", true);
      botaoAcessarLogin.innerText = "Bloqueado";
      return false;
      //Se ambos forem válidos
    } else {
      botaoAcessarLogin.removeAttribute("disabled");
      botaoAcessarLogin.innerText = "Acessar";
      return true;
    }
  }