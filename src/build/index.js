(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var JUGADORX = "Jugador 1 - las X";
var JUGADOR0 = "Jugador 2 - los 0";

// Funcion para comprobar que jugador ha ganado.
function compruebaGanador(valores) {

	// Numero total de movimientos.
	var n = 9;

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++) {

		// Contadores para coincidencias.
		var n1X = 0;
		var n2X = 0;
		var n3X = 0;
		var n4X = 0;
		var n10 = 0;
		var n20 = 0;
		var n30 = 0;
		var n40 = 0;

		// Variable para indicar que el juego ha acabado con ganador.
		var juegoConGanador = false;

		// Bucle secundario para comprobar las filas y columnas.
		for (var b = 0; b < 3; b++) {

			// Comprobamos filas para el valor X.
			if (valores[a][b] === 'X') {
				n1X++;
				n--;
			}

			// Comprobamos columnas para el valor X.
			if (valores[b][a] === 'X') {
				n2X++;
				n--;
			}

			// Comprobamos la diagonal principal para el valor X.
			if (valores[b][b] === 'X') {
				n3X++;
				n--;
			}

			// Comprobamos la diagonal inversa para el valor X.
			if (valores[b][2 - b] === 'X') {
				n4X++;
				n--;
			}

			// Comprobamos filas para el valor 0.
			if (valores[a][b] === '0') {
				n10++;
				n--;
			}

			// Comprobamos columnas para el valor 0.
			if (valores[b][a] === '0') {
				n20++;
				n--;
			}

			// Comprobamos la diagonal principal para el valor 0.
			if (valores[b][b] === '0') {
				n30++;
				n--;
			}

			// Comprobamos la diagonal inversa para el valor 0.
			if (valores[b][2 - b] === '0') {
				n40++;
				n--;
			}
		}

		// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
		if (n1X === 3 || n2X === 3 || n3X === 3 || n4X === 3) {
			juegoConGanador = true;
			return confirm("Ha ganado el jugador X. \n ¿Desea empezar otra partida?");
		}

		// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
		if (n10 === 3 || n20 === 3 || n30 === 3 || n40 === 3) {
			juegoConGanador = true;
			return confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
		}

		// Si se ha acabado el juego sin ganador.
		if (n === 0 && !juegoConGanador) {
			return confirm("Juego Terminado. Nadie ha ganado. \n ¿Desea empezar otra partida?");
		}
	}
};

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			turno: JUGADORX,
			valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
		};
	},
	getInitialStateButton: function getInitialStateButton() {
		this.setState({
			turno: JUGADORX,
			valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
		});
	},
	appClick: function appClick(numeroFila, numeroColumna) {
		var valores = this.state.valores;
		var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			valores: this.state.valores
		});
		var z = compruebaGanador(this.state.valores);
		if (z === true) {
			this.setState({
				turno: JUGADORX,
				valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
			});
		}
	},
	render: function render() {
		var texto;
		texto = "Turno del " + this.state.turno;
		return React.createElement(
			'div',
			null,
			React.createElement(Cabecera, { texto: texto }),
			React.createElement(Tablero, { valores: this.state.valores, manejadorTableroClick: this.appClick }),
			React.createElement(
				'button',
				{ id: 'reset', onClick: this.getInitialStateButton },
				' Reiniciar Partida. '
			)
		);
	}
});

module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
	displayName: "Cabecera",

	render: function render() {
		return React.createElement(
			"header",
			{ className: "cabecera" },
			this.props.texto
		);
	}
});

module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};

var Casilla = React.createClass({
	displayName: 'Casilla',

	casillaClick: function casillaClick() {
		if (this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function render() {
		return React.createElement(
			'button',
			{ style: casillaStyle, className: this.props.valor === "-" ? "clickable" : "no_clickable", onClick: this.casillaClick },
			this.props.valor
		);
	}
});

module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");

var Tablero = React.createClass({
	displayName: "Tablero",

	tableroClick: function tableroClick(numeroFila, numeroColumna) {
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function render() {
		var casillas = this.props.valores.map((function (valoresFila, indiceFila) {
			var fila = valoresFila.map((function (valor, indiceColumna) {
				var mykey = "" + indiceFila + indiceColumna;
				return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila,
					indiceColumna: indiceColumna, key: mykey, manejadorClick: this.tableroClick });
			}).bind(this));
			return React.createElement(
				"div",
				{ key: "fila" + indiceFila },
				fila
			);
		}).bind(this));
		return React.createElement(
			"div",
			null,
			casillas
		);
	}
});

module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");

ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
