; (function () {
    'use strict'

    var juego = {
        palabra: 'ALURA',
        estado: 7,
        adivinado: ['A', 'L'],
        errado: ['B', 'J', 'K', 'C']
    }

    var $html = {
        hombre: document.getElementById('hombre'),
        adivinado: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado')
    }

    function dibujar(juego) {
        //actualizar la imagen del hombre
        let $elem;
        $elem = $html.hombre;
        let estado = juego.estado;
        if (estado == 8) {
            estado == juego.previo;
        }
        $elem.src = './img/estados/0' + estado + '.png';

        //creamos las letras a adivinadas
        let palabra = juego.palabra;
        let adivinado = juego.adivinado;
        $elem = $html.adivinado;
        //borramos los elementos anteriores
        $elem.innerHTML = '';

        for (let letra of palabra) {
            let $span = document.createElement('span');
            let $txt = document.createTextNode('');

            if (adivinado.indexOf(letra) >= 0) {
                $txt.nodeValue = letra;
            }

            $span.setAttribute('class', 'letra adivinada');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }

        //creamos las letras erradas
        let errado = juego.errado;
        $elem = $html.errado;
        //borramos los elementos anteiores
        $elem.innerHTML = '';
        for (let letra of errado) {
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letra);
            $span.setAttribute('class', 'letra errada');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }

    }

    function adivinar(juego, letra) {
        let estado = juego.estado;
        //si ya persite o ganaste no hay que hacer nada!
        if (estado == 1 || estado == 8) {
            return;
        }

        //si ya has adivinado o errado la letra tampoco hay que hacer nada!
        let adivinado = juego.adivinado;
        let errado = juego.errado;

        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
            return;
        }

        let palabra = juego.palabra;
        //si es letra la palabra
        if (palabra.indexOf(letra) >= 0) {
            let ganado = true;
            //debemos ver si llegamos al estado ganado
            for (let l of palabra) {
                if (adivinado.indexOf(l) < 0 && l != letra) {
                    ganado = false;
                    juego.previo = juego.estado;
                    break;
                }
            }
            //si ya hermos ganado, debemos indicarlo
            if (ganado) {
                juego.ganado = 8;
            }
            //agregamos la letra a la lista de letras adivinadas
            adivinado.push(letra);
        } else {
            //si no es letra, acercamos al hombre a la ahorca
            juego.estado--;
            //agregamos la letra, a la lista de letras erradas
            errado.push(letra);
        }

    }


    window.onkeypress = function adivinarLetra(e) {
        let letra = e.key;
        letra = letra.toUpperCase();
        if (/[^A-ZÑ]/.test(letra)) {
            return
        }
        adivinar(juego, letra);
        dibujar(juego);
    }

    dibujar(juego)

}())