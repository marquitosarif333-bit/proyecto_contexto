// Uso de JQuery
$(document).ready(function () {

    /* =====================================================
       PRELOADER
    ===================================================== */
    $(window).on("load", function () {
        $("#preloader").fadeOut(700);
    });

    /* =====================================================
       MENÚ RESPONSIVE
    ===================================================== */
    $("#btnMenu").click(function () {
        $("#menu").toggleClass("mostrar");
        $(this).find("i").toggleClass("fa-bars fa-xmark");
    });

    /* =====================================================
       CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
    ===================================================== */
    $(".enlace-menu").click(function () {
        $("#menu").removeClass("mostrar");
        $("#btnMenu i").removeClass("fa-xmark").addClass("fa-bars");
    });

    /* =====================================================
       SCROLL SUAVE
    ===================================================== */
    $(".enlace-menu, .hero a, .cta a, .footer-enlaces a").click(function (e) {
        let destino = $(this).attr("href");
        if (destino && destino.startsWith("#")) {
            e.preventDefault();
            let seccion = $(destino);
            if (seccion.length) {
                $("html, body").animate({
                    scrollTop: seccion.offset().top - 70
                }, 800);
            }
        }
    });

    /* =====================================================
       CAMBIO DE HEADER Y BOTÓN ARRIBA AL HACER SCROLL
    ===================================================== */
    $(window).scroll(function () {
        let posicion = $(window).scrollTop();

        if (posicion > 50) {
            $("#header").addClass("scroll");
        } else {
            $("#header").removeClass("scroll");
        }

        if (posicion > 500) {
            $("#btnArriba").fadeIn(300);
        } else {
            $("#btnArriba").fadeOut(300);
        }

        /* MENÚ ACTIVO EN SCROLL */
        $("section[id]").each(function () {
            let seccionTop = $(this).offset().top - 120;
            let seccionBottom = seccionTop + $(this).outerHeight();
            let id = $(this).attr("id");

            if (posicion >= seccionTop && posicion < seccionBottom) {
                $(".enlace-menu").removeClass("activo");
                $('.enlace-menu[href="#' + id + '"]').addClass("activo");
            }
        });
    });

    /* =====================================================
       BOTÓN SUBIR
    ===================================================== */
    $("#btnArriba").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
    });

    /* =====================================================
       CONTADORES
    ===================================================== */
    let contadorIniciado = false;
    function iniciarContadores() {
        if (contadorIniciado) return;

        let posicion = $(window).scrollTop();
        let estadisticas = $(".estadisticas");
        
        if (estadisticas.length === 0) return;

        let estadisticasTop = estadisticas.offset().top;
        let alturaVentana = $(window).height();

        if (posicion + alturaVentana > estadisticasTop + 100) {
            contadorIniciado = true;

            $(".contador").each(function () {
                let elemento = $(this);
                let numeroFinal = parseInt(elemento.attr("data-numero"));

                $({ numero: 0 }).animate({ numero: numeroFinal }, {
                    duration: 1800,
                    easing: "swing",
                    step: function () {
                        elemento.text(Math.floor(this.numero));
                    },
                    complete: function () {
                        elemento.text(numeroFinal + "+");
                    }
                });
            });
        }
    }

    $(window).scroll(function () {
        iniciarContadores();
    });

    /* =====================================================
       ANIMACIÓN DE TARJETAS
    ===================================================== */
    $(".valor").css({
        opacity: 0,
        position: "relative",
        top: "25px"
    });

    function animarValores() {
        let posicionScroll = $(window).scrollTop();
        let ventana = $(window).height();

        $(".valor").each(function () {
            let elemento = $(this);
            let posicionElemento = elemento.offset().top;

            if (posicionScroll + ventana > posicionElemento + 50) {
                elemento.animate({
                    opacity: 1,
                    top: 0
                }, 600);
            }
        });
    }

    $(window).scroll(function () {
        animarValores();
    });

    /* =====================================================
       FORMULARIO DE CONTACTO
    ===================================================== */
    $("#formContacto").submit(function (e) {
        e.preventDefault();

        let nombre = $.trim($("#nombre").val());
        let correo = $.trim($("#correo").val());
        let asunto = $("#asunto").val();
        let mensaje = $.trim($("#mensaje").val());

        if (nombre === "") {
            mostrarMensaje("Por favor, escribe tu nombre.", "error");
            $("#nombre").focus();
            return;
        }

        let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!expresionCorreo.test(correo)) {
            mostrarMensaje("Ingresa un correo electrónico válido.", "error");
            $("#correo").focus();
            return;
        }

        if (asunto === "") {
            mostrarMensaje("Selecciona el motivo de tu solicitud.", "error");
            $("#asunto").focus();
            return;
        }

        if (mensaje.length < 10) {
            mostrarMensaje("El mensaje debe contener al menos 10 caracteres.", "error");
            $("#mensaje").focus();
            return;
        }

        mostrarMensaje("¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.", "exito");
        $("#formContacto")[0].reset();
    });

    function mostrarMensaje(texto, tipo) {
        let color = (tipo === "exito") ? "#4a7c59" : "#c86d51";

        $("#mensajeFormulario")
            .stop(true, true)
            .css({ color: color, fontWeight: "600" })
            .hide()
            .text(texto)
            .fadeIn(400);

        setTimeout(function () {
            $("#mensajeFormulario").fadeOut(500);
        }, 5000);
    }

    /* INICIAR ANIMACIONES */
    animarValores();
    iniciarContadores();
});

/* =====================================================
   SLIDER AUTOMÁTICO
===================================================== */
let indiceSlide = 0;
setInterval(function(){
    let slides = $(".slide");
    if(slides.length === 0) return;
    
    slides.removeClass("activo");
    indiceSlide++;
    if(indiceSlide >= slides.length){
        indiceSlide = 0;
    }
    slides.eq(indiceSlide).addClass("activo");
}, 3000);