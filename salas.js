
var firebaseConfig = {
    apiKey: "AIzaSyDEt12sng8W1M71YMvbtcRw6frWZfomd1Q",
    authDomain: "proyectok-2b513.firebaseapp.com",
    databaseURL: "https://proyectok-2b513-default-rtdb.firebaseio.com",
    projectId: "proyectok-2b513",
    storageBucket: "proyectok-2b513.appspot.com",
    messagingSenderId: "455336755837",
    appId: "1:455336755837:web:d1e92a6b9c1aa715b1a714"
  };
    
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  Nombre = localStorage.getItem("Nombre");
  NombSala = localStorage.getItem("NombSala");

  document.getElementById("hola").innerHTML="¡Hola "+Nombre+"!";

function CrearSala(){
    NombSala = document.getElementById("Sala").value;
 
    firebase.database().ref("/").child(NombSala).update({
        proposito : "añadir sala"
    });
 
    localStorage.setItem("NombSala", NombSala);
    window.location = "Kwitter_page.html"; 

  }


function getData() {
    firebase.database().ref("/" + NombSala).on('value', function(snapshot) {
       document.getElementById("MostrarMsj").innerHTML = ""; 
       snapshot.forEach(function (childSnapshot) { 
         childKey  = childSnapshot.key;
         childData = childSnapshot.val();
         if (childKey != "proposito"){
          Etiq_firebase = childKey;
          valores_firebase = childData;
          
          console.log(Etiq_firebase);
          console.log=(valores_firebase);
          NombUsuario = valores_firebase['nombre'];
          mjsUsuario = valores_firebase['mensaje'];
          like = valores_firebase['like'];
          nombreConEtiqs = "<h4> " + NombUsuario + "<img class ='user_tick' src ='tick.png'></h4>";
          msjConEtiqs = "<h4 class='message_h4'>" + mjsUsuario + "</h4>";
          botonLike = "<button class='btn btn-warning' id=" + Etiq_firebase +" value=" + like + " onclick='updatelike(this.id)'>";
          spanConEtiqs = "<span class='glyphicon glyphicon-thumbs-up'>like:" + like + "</span></button><hr>"; 

          row = nombreConEtiqs + msjConEtiqs + botonLike + spanConEtiqs;
          document.getElementById("MostrarMsj").innerHTML += row;

         }
    });
  });
}
getData();


function Salir(){
  localStorage.removeItem("Nombre");
  localStorage.removeItem("NombSala");
  window.location.replace("index.html")
}


function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("NombSala", name);
  window.location = "kwitter_page.html";
}