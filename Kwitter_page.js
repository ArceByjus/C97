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
  Sala = localStorage.getItem("NombSala");

  function Salir(){
    localStorage.removeItem("Nombre");
    localStorage.removeItem("NombSala");
    window.location.replace("index.html")
  }

  function Enviar(){
    msg = document.getElementById("msj").value;
    firebase.database().ref(Sala).push({
        nombre:Nombre,
        mensaje:msg,
        like:0
    });

    document.getElementById("msj").value = "";
  }

  function getData(){
    firebase.database().ref("/" + Sala).on('value', function(snapshot){
      document.getElementById("MostrarMsj").innerHTML="";
      snapshot.forEach(function (childSnapshot){
        childKey = childSnapshot.key;
        childData =childSnapshot.val();
        if(childKey != "proposito") {
          Etiq_firebase = childKey;
          valores_firebase = childData;

          console.log(Etiq_firebase);
          console.log(valores_firebase);
          nombUsuario = valores_firebase['nombre'];
          mensaje = valores_firebase['mensaje'];
          like = valores_firebase['like'];
          NombConEtiq = "<h4>" + nombUsuario + "<img class='user_tick' src='tick.png'></h4>"
          mensajeConEtiq = "<h4 class='message_h4'>" + mensaje + "</h4>";
          botonLike = "<button class='btn btn-warning' id=" + Etiq_firebase + " value=" + like + " onclick='updateLike(this.id)'>";
          spanConEtiq = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

          row = NombConEtiq + mensajeConEtiq + botonLike + spanConEtiq;
          document.getElementById("MostrarMsj").innerHTML += row;
        }
      });
    });
  }

  getData();

  function updateLike(msjId){
    console.log("Click en like " + msjId);
    BotonId = msjId;
    likes = document.getElementById(BotonId).value;
    update_likes = Number(like) + 1;
    console.log(update_likes);

    firebase.database().ref(Sala).child(msjId).update({
      like: update_likes
    });

  }