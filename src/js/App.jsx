const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "Jugador 1 - las X";
const JUGADOR0 = "Jugador 2 - los 0";

// Funcion para comprobar que jugador ha ganado.
function compruebaGanador(valores){

	// Numero total de movimientos.
	var n = 9;

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++){
		
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
		for (var b = 0; b < 3; b++){

			// Comprobamos filas para el valor X.
			if(valores[a][b] === 'X'){
				n1X++;
				n--;
			}

			// Comprobamos columnas para el valor X.
			if(valores[b][a] === 'X'){
				n2X++;
				n--;
			}

			// Comprobamos la diagonal principal para el valor X.
			if (valores[b][b] === 'X'){
				n3X++;
				n--;
			}

			// Comprobamos la diagonal inversa para el valor X.
			if (valores[b][2-b] === 'X'){
				n4X++;
				n--;
			}

			// Comprobamos filas para el valor 0.
			if(valores[a][b] === '0'){
				n10++;
				n--;
			}

			// Comprobamos columnas para el valor 0.
			if(valores[b][a] === '0'){
				n20++;
				n--;
			}

			// Comprobamos la diagonal principal para el valor 0.
			if (valores[b][b] === '0'){
				n30++;
				n--;
			}

			// Comprobamos la diagonal inversa para el valor 0.
			if (valores[b][2-b] === '0'){
				n40++;
				n--;
			}
		}

		// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
		if(n1X === 3 || n2X === 3 || n3X === 3 || n4X ===3){
			juegoConGanador = true;
			return confirm("Ha ganado el jugador X. \n ¿Desea empezar otra partida?");
		}

		// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
		if(n10 === 3 || n20 === 3 || n30 === 3 || n40 ===3){
			juegoConGanador = true;
			return confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
		}

		// Si se ha acabado el juego sin ganador.
		if(n === 0 && !juegoConGanador){
			return confirm("Juego Terminado. Nadie ha ganado. \n ¿Desea empezar otra partida?");
		}

	}

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
	getInitialStateButton: function(){
		this.setState({
			turno: JUGADORX,
			valores: [
				['-', '-', '-'],
				['-', '-', '-'],
				['-', '-', '-']
			]
		});
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
				<Tablero valores={this.state.valores} manejadorTableroClick={this.appClick}/>
				<button id="reset" onClick={this.getInitialStateButton} > Reiniciar Partida. </button>
			</div>
		)
	}
});

module.exports = App;