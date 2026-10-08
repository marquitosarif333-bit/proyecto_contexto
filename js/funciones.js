//Uso de JQuery
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

        $(this).find("i").toggleClass(
            "fa-bars fa-xmark"
        );

    });



    /* =====================================================
       CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
    ===================================================== */

    $(".enlace-menu").click(function () {

        $("#menu").removeClass("mostrar");

        $("#btnMenu i").removeClass("fa-xmark");
        $("#btnMenu i").addClass("fa-bars");

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
       CAMBIO DE HEADER AL HACER SCROLL
    ===================================================== */

    $(window).scroll(function () {

        let posicion = $(window).scrollTop();

        if (posicion > 50) {

            $("#header").addClass("scroll");

        } else {

            $("#header").removeClass("scroll");

        }


        /* ================================================
           BOTÓN SUBIR
        ================================================= */

        if (posicion > 500) {

            $("#btnArriba").fadeIn(300);

        } else {

            $("#btnArriba").fadeOut(300);

        }


        /* ================================================
           MENÚ ACTIVO
        ================================================= */

        $("section[id]").each(function () {

            let seccionTop = $(this).offset().top - 120;

            let seccionBottom =
                seccionTop + $(this).outerHeight();

            let id = $(this).attr("id");

            if (
                posicion >= seccionTop &&
                posicion < seccionBottom
            ) {

                $(".enlace-menu").removeClass("activo");

                $('.enlace-menu[href="#' + id + '"]')
                    .addClass("activo");

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

        if (contadorIniciado) {
            return;
        }

        let posicion = $(window).scrollTop();

        let estadisticasTop =
            $(".estadisticas").offset().top;

        let alturaVentana =
            $(window).height();

        if (
            posicion + alturaVentana >
            estadisticasTop + 100
        ) {

            contadorIniciado = true;

            $(".contador").each(function () {

                let elemento = $(this);

                let numeroFinal =
                    parseInt(elemento.attr("data-numero"));

                $({

                    numero: 0

                }).animate({

                    numero: numeroFinal

                }, {

                    duration: 1800,

                    easing: "swing",

                    step: function () {

                        elemento.text(
                            Math.floor(this.numero)
                        );

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

        let posicionScroll =
            $(window).scrollTop();

        let ventana =
            $(window).height();

        $(".valor").each(function () {

            let elemento = $(this);

            let posicionElemento =
                elemento.offset().top;

            if (
                posicionScroll + ventana >
                posicionElemento + 50
            ) {

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


        let nombre =
            $.trim($("#nombre").val());

        let correo =
            $.trim($("#correo").val());

        let asunto =
            $("#asunto").val();

        let mensaje =
            $.trim($("#mensaje").val());


        /* ================================================
           VALIDACIÓN DEL NOMBRE
        ================================================= */

        if (nombre === "") {

            mostrarMensaje(
                "Por favor, escribe tu nombre.",
                "error"
            );

            $("#nombre").focus();

            return;

        }


        /* ================================================
           VALIDACIÓN DEL CORREO
        ================================================= */

        let expresionCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!expresionCorreo.test(correo)) {

            mostrarMensaje(
                "Ingresa un correo electrónico válido.",
                "error"
            );

            $("#correo").focus();

            return;

        }


        /* ================================================
           VALIDACIÓN DEL ASUNTO
        ================================================= */

        if (asunto === "") {

            mostrarMensaje(
                "Selecciona el motivo de tu solicitud.",
                "error"
            );

            $("#asunto").focus();

            return;

        }


        /* ================================================
           VALIDACIÓN DEL MENSAJE
        ================================================= */

        if (mensaje.length < 10) {

            mostrarMensaje(
                "El mensaje debe contener al menos 10 caracteres.",
                "error"
            );

            $("#mensaje").focus();

            return;

        }


        /* ================================================
           MENSAJE EXITOSO
        ================================================= */

        mostrarMensaje(
            "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.",
            "exito"
        );


        /* LIMPIAR FORMULARIO */

        $("#formContacto")[0].reset();

    });



    /* =====================================================
       FUNCIÓN PARA MENSAJES DEL FORMULARIO
    ===================================================== */

    function mostrarMensaje(texto, tipo) {

        let color;

        if (tipo === "exito") {

            color = "#087443";

        } else {

            color = "#d92d20";

        }


        $("#mensajeFormulario")
            .stop(true, true)
            .css({

                color: color,
                fontWeight: "600"

            })
            .hide()
            .text(texto)
            .fadeIn(400);


        setTimeout(function () {

            $("#mensajeFormulario").fadeOut(500);

        }, 5000);

    }



    /* =====================================================
       EFECTO HOVER EN ESTADÍSTICAS
    ===================================================== */

    $(".estadistica").hover(

        function () {

            $(this)
                .find("i")
                .stop()
                .animate({

                    fontSize: "29px"

                }, 200);

        },

        function () {

            $(this)
                .find("i")
                .stop()
                .animate({

                    fontSize: "23px"

                }, 200);

        }

    );



    /* =====================================================
       EFECTO HOVER EN BOTONES
    ===================================================== */

    $(".btn-principal, .btn-secundario, .btn-formulario")
        .hover(

            function () {

                $(this).stop().animate({

                    opacity: 0.88

                }, 200);

            },

            function () {

                $(this).stop().animate({

                    opacity: 1

                }, 200);

            }

        );



    /* =====================================================
       EFECTO PARA LA HISTORIA
    ===================================================== */

    $(".historia-item").css({

        opacity: 0,
        position: "relative",
        left: "-25px"

    });


    function animarHistoria() {

        let scroll =
            $(window).scrollTop();

        let altura =
            $(window).height();

        $(".historia-item").each(function (indice) {

            let elemento = $(this);

            let posicion =
                elemento.offset().top;

            if (
                scroll + altura >
                posicion + 70
            ) {

                elemento.delay(indice * 120).animate({

                    opacity: 1,
                    left: 0

                }, 600);

            }

        });

    }


    $(window).scroll(function () {

        animarHistoria();

    });



    /* =====================================================
       INICIAR ANIMACIONES
    ===================================================== */

    animarValores();

    animarHistoria();

    iniciarContadores();


});

let indiceSlide = 0;

setInterval(function(){

    let slides = $(".slide");

    slides.removeClass("activo");

    indiceSlide++;

    if(indiceSlide >= slides.length){
        indiceSlide = 0;
    }

    slides.eq(indiceSlide).addClass("activo");

},3000);
