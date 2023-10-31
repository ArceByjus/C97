function InicioSesion(){
    Nombre = document.getElementById("nomb_usuario").value;
    localStorage.setItem("Nombre", Nombre);
    window.location = "salas.html";
}