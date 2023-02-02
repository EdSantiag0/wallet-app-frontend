const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    ); // fetch para uma URL // Chamada de API
    const user = await result.json(); //Usuario vai pegar o resultado json dentro do Fetch //json para a troca de dados
    return user; // Retornar usuario para verificar se deu tudo certo
  } catch (error) {
    return { error }; //Caso o usuario digitado der incompatibilidade com API {error}
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("Email Inválido!");
    return;
  }
  const result = await validateUser(email); //Fazer a validação do usuario
  console.log(result);
  if (result.error) {
    alert("Falha ao validar e-mail"); //Caso der erro no result
    return;
  }
  localStorage.setItem("@WalletApp:userEmail", result.email); //Salva a informação do e-mail
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("./src/pages/home/index.html", "_self");
};
