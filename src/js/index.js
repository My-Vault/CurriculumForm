function sendData(e, nombre, apellido, celular, email, fecha, cargo, cv) {
  var formdata = new FormData();
  formdata.append("Nombre", document.getElementById("nombre").value);
  formdata.append("Apellido", document.getElementById("apellido").value);
  formdata.append("Celular", document.getElementById("celular").value);
  formdata.append("Email", document.getElementById("email").value);
  formdata.append("Fecha", document.getElementById("fecha").value);
  formdata.append("Cargo", document.getElementById("cargo").value);
  formdata.append("Attachment", document.getElementById("cv").files[0]);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  if (document.getElementById("nombre").value.length < 2) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "El nombre y el apellido debe tener al menos 2 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("nombre").value.length > 20) {
    Swal.fire({
      title: "Error",
      text: "El nombre y el apellido debe tener menos de 20 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("apellido").value.length < 2) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "El nombre y el apellido debe tener al menos 2 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("apellido").value.length > 20) {
    Swal.fire({
      title: "Error",
      text: "El nombre y el apellido debe tener menos de 20 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("celular").value.length != 9) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "El celular debe tener 9 dígitos",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("email").value.length < 5) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "El email debe tener al menos 5 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("email").value.length > 50) {
    Swal.fire({
      title: "Error",
      text: "El email debe tener menos de 50 caracteres",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (document.getElementById("fecha").value.length != 10) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "Debe ingresar una fecha válida",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if(document.getElementById("cargo").value.length < 2){
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "Debe seleccionar un cargo de la lista",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (!document.getElementById("cv").files[0]) {
    Swal.fire({
      title: "Todos los campos son obligatorios",
      text: "Debe seleccionar un archivo",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    if (
      Math.round(document.getElementById("cv").files[0].size / 1024) / 1024 <
      4
    ) {
      if (
        getExtension(document.getElementById("cv").files[0].name) == "pdf" ||
        getExtension(document.getElementById("cv").files[0].name) == "docx" ||
        getExtension(document.getElementById("cv").files[0].name) == "doc" ||
        getExtension(document.getElementById("cv").files[0].name) == "png" ||
        getExtension(document.getElementById("cv").files[0].name) == "jpg" ||
        getExtension(document.getElementById("cv").files[0].name) == "jpeg" ||
        getExtension(document.getElementById("cv").files[0].name) == "bmp"
      ) {
        fetch("https://localhost:44345/api/Email/Send", requestOptions)
          // fetch(
          //   "https://api.toto.com.uy:2556/APICurriculums/api/Email/Send",
          //   requestOptions
          // )
          .then((response) => {
            response.text();
            console.log(document.getElementById("fecha").value.length);
            console.log(response);
            if (response.status == 200) {
              Swal.fire({
                title: "¡Gracias!",
                text: "Tu CV ha sido enviado con éxito, nos comunicaremos contigo a la brevedad.",
                icon: "success",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "https://www.toto.com.uy";
                }
              });
            }
          })
          .then((result) => console.log(result))
          .catch((error) => {
            console.log(document.getElementById("fecha").value.length);
            console.log("error", error);
              Swal.fire({
                title: "No se pudo enviar tu CV",
                text: "Intente nuevamente, si el problema persiste, comunicarse con atención al cliente",
                icon: "error",
                confirmButtonText: "Ok",
              });
            
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "El formato del archivo no es válido",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "El archivo no puede superar los 4MB",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
}
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
document.getElementById("btn").addEventListener("click", function () {
  sendData();
});

function getExtension(filename) {
  return filename.split(".").pop();
}
