function showRegister(){
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
}

function showLogin(){
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
}

function register(){
    const u = regUsername.value.trim();
    const p = regPassword.value.trim();
    const c = regConfirm.value.trim();

    if(!u || !p || !c){
        alert("Isi semua data");
        return;
    }

    if(p !== c){
        alert("Password tidak sama");
        return;
    }

    if(localStorage.getItem("user_"+u)){
        alert("Username sudah dipakai");
        return;
    }

    localStorage.setItem("user_"+u,p);
    localStorage.setItem("loggedIn",u);
    location.href="app.html";
}

function login(){
    const u = loginUsername.value.trim();
    const p = loginPassword.value.trim();

    if(localStorage.getItem("user_"+u)!==p){
        alert("Login gagal");
        return;
    }

    localStorage.setItem("loggedIn",u);
    location.href="app.html";
}

function logout(){
    localStorage.removeItem("loggedIn");
    location.href="login.html";
}

if(location.pathname.includes("app.html") && !localStorage.getItem("loggedIn")){
    location.href="login.html";
}