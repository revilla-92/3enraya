const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

function compruebaGanador(valores){

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++){
		
		// Contadores para coincidencias en fila de 3.
		var n1X = 0;
		var n2X = 0;
		var n3X = 0;
		var n4X = 0;
		var n10 = 0;
		var n20 = 0;
		var n30 = 0;
		var n40 = 0;
		var juegoAcabado = false;

		// Bucle secundario para comprobar las filas y columnas.
		for (var b = 0; b < 3; b++){

			// Comprobamos filas para el valor X
			if(valores[a][b] === 'X'){
				n1X++;
			}
			// Comprobamos columnas para el valor X
			if(valores[b][a] === 'X'){
				n2X++;
			}
			// Comprobamos filas para el valor 0
			if(valores[a][b] === '0'){
				n10++;
			}
			// Comprobamos columnas para el valor 0
			if(valores[b][a] === '0'){
				n20++;
			}

			// Comprobamos la diagonal principal.
			if (valores[b][b] === 'X'){
				n3X++;
			}

			if (valores[b][b] === '0'){
				n30++;
			}

			// Comprobamos la diagonal inversa.
			if (valores[b][2-b] === 'X'){
				n4X++;
			}

			if(valores[b][2-b] === '0'){
				n40++;
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n1X === 3 || n2X === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X. \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n10 === 3 || n20 === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			if(n3X === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			if(n30 === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			if(n4X === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			if(n40 === 3){
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if(x === true){
					return true;
				}
			}

			if(juegoAcabado === true){
				break;
			}
		}
	}
};

function ponerACero(a, b, c, d, e, f, g, h){
	a = b = c = d = e = f = g = h = 0;
};

var App = React.createClass({
	getInitialState: function(){
		return {
			turno: JUGADORX,
			valores: [
			['-', '-', '-'],
			['-', '-', '-'],
			['-', '-', '-']
			]
		};
	},
	appClick: function(numeroFila, numeroColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
			valores: this.state.valores
		});
		var z = compruebaGanador(this.state.valores);
		if(z === true){
			this.setState({
				turno: JUGADORX,
				valores: [
				['-', '-', '-'],
				['-', '-', '-'],
				['-', '-', '-']
				]
			});
		}
	},
	render: function(){
		var texto;
		texto = "Turno del " + this.state.turno;
		return (
			<div>
			<Cabecera texto={texto}/>
			<Tablero valores={this.state.valores}
			manejadorTableroClick={this.appClick}/>
			</div>
		)
	}
});

module.exports = App;