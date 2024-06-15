$(document).ready(function () {
  console.log('Se esta cargando el JS Validations')
  $("#motSol").hide();
  $("#compraCarteraTitle").hide();
  $("#compraCartera").hide();
  $("#otroMotivo").hide();

  $(".btnSave").click(function () {
    $("#modalExitoso").hide();
    $("#modalError").hide();
    window.location.reload();
  })

  $(function () {
    $("#form_final").on('change', '#tipoCertificacion', function () {
      var selectValue = $(this).val();
      switch (selectValue) {
        case "saldo":
          $("#motSol").show();
          $("#compraCarteraTitle, #compraCartera,#otroMotivo").hide();
          break;
        case "informativa":
          $("#motSol, #compraCarteraTitle, #compraCartera, #otroMotivo").hide();
          break;
        case "":
          $("#motSol, #compraCarteraTitle, #compraCartera, #otroMotivo").hide();
          break;
      }
    }).change();
  });

  $(function () {
    $("#motivoSolicitud").on('change', function () {
      var selectValue = $(this).val();
      switch (selectValue) {
        case "compraCartera":
          $("#compraCarteraTitle,#compraCartera").show();
          $("#otroMotivo").hide();
          break;
        case "tramitePer":
          $("#compraCarteraTitle, #otroMotivo, #compraCartera").hide();
          $("#compCartera, #cual").val("");
          break;
        case "":
          $("#compraCarteraTitle, #otroMotivo, #compraCartera").hide();
          break;
      }
    }).change();
  });

  $(function () {
    $("#compCartera").on('change', function () {
      var selectValue = $(this).val();
      switch (selectValue) {
        case "":
          $("#otroMotivo").hide();
          break;
        case "mayor monto":
          $("#otroMotivo").hide();
          break;
        case "menor tasar":
          $("#otroMotivo").hide();
          break;
        case "menor cuota":
          $("#otroMotivo").hide();
          break;
        case "mejor Servicio":
          $("#otroMotivo").hide();
          break;
        case "otro":
          $("#otroMotivo").show();
          break;
      }
    }).change();
  });

  $("#correo").on('keyup focusout', function () {

    if (validarFormatoCorreos1("#correo") && validarCampoVacio("#correo")) {
      $("#correo").css("border", "1px solid green");
      $("#msgemail").hide();

    } else if (!validarCampoVacio("#correo")) {
      $("#correo").css("border", "1px solid red");
      $("#msgemail").show();
      $("#msgemail").html("<label class='error-text_bp'>Este campo es obligatorio</label>");
    } else if (!validarFormatoCorreos1("#correo")) {
      $("#correo").css("border", "1px solid red");
      $("#correo").show();
      $("#msgemail").html("<label class='error-text_bp'>Correo no valido</label>");
    }
    $("#correoConf").val('');
    validacionKeyUpCorreos("#correoConf", "#correo", "#msgemailCon");
  });

  $("#correoConf").on('keyup focusout', function () {

    validacionKeyUpCorreos("#correoConf", "#correo", "#msgemailCon");
  });

  function validacionKeyUpCorreos(idCorreo1, idCorreo2, msjCorreo1) {

    if (validarFormatoCorreos1(idCorreo1) && validarCampoVacio(idCorreo1) && validarCorreosIguales(idCorreo1, idCorreo2)) {
      $(idCorreo1).css("border", "1px solid green");
      $(msjCorreo1).hide();
      /* $(msjCorreo1).html("<label class='text-success'>Correos validos</label>"); */
      if (validarCampoVacio("#nombre") && validarCampoVacio("#apellido")
        && validarCampoVacio("#tipoDocumento") && validarCampoVacio("#numeroDocumento")
        && validarCampoVacio("#telefono") && validarCampoVacio("#ciudad")) {
        $("#btn_continuar").removeClass("btn-form no-active disabled").addClass("btn-form active");
      }
    } else if (!validarCampoVacio(idCorreo1)) {
      $(idCorreo1).css("border", "1px solid red");
      $(msjCorreo1).html("<label class='error-text_bp'>Este campo es obligatorio</label>");  /* Para mensaje en el input confirmar correo */
      $("#btn_continuar").removeClass("btn-form active").addClass("btn-form no-active disabled");
    } else if (!validarFormatoCorreos1(idCorreo2)) {
      $(idCorreo2).css("border", "1px solid red");
      $(msjCorreo1).html("<label class='error-text_bp'>Correo no valido</label>");
      $("#btn_continuar").removeClass("btn-form active").addClass("btn-form no-active disabled");

    } else if (!validarCorreosIguales(idCorreo1, idCorreo2)) {
      $(idCorreo1).css("border", "1px solid red");
      $("#msgemail").hide();
      $("#correo").show();
      $(msjCorreo1).show();
      $(msjCorreo1).html("<label class='error-text_bp'>Los correos electrónicos no son iguales</label>");
      $("#btn_continuar").removeClass("btn-form active").addClass("btn-form no-active disabled");
    }

  }

  //Funcion para validar que los campos correo no esten vacios
  function validarCampoVacio(campoId) {
    if ($(campoId).val() == '') {
      return false;
    } else {
      return true;
    }
  }


  //Funcion para validar que los correos sean iguales
  function validarCorreosIguales(idCampo, idCampo2) {
    if ($(idCampo).val() === $(idCampo2).val()) {
      return true;
    } else {
      return false;
    }
  }

  function validarFormatoCorreos1(campoId) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test($(campoId).val())) {
      return true;
    } else {
      return false;
    }
  }

  function validarCampoCorreo() {
    var email = $("#correo").val();
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  function validarCampoCorreoconf() {
    var emailconf = $("#correoConf").val();
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(emailconf)) {
      return true;
    } else {
      return false;
    }
  }

  function toggleLabel() {
    var checkbox = document.getElementById("toggleCheckbox");
    var label = document.querySelector('.custom-toggle-slider');
    label.textContent = checkbox.checked ? label.dataset.labelOn : label.dataset.labelOff;
  }

});
