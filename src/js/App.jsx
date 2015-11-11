const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

function compruebaGanador(){
	// Comprobaciones para las diagonaes.
	if((this.state.valores[0][0] && this.state.valores[1][1] && this.state.valores[2][2])  === 'X'){
		alert("Ha ganado el jugador X");
	}

	if((this.state.valores[0][0] && this.state.valores[1][1] && this.state.valores[2][2])  === '0'){
		alert("Ha ganado el jugador 0");
	}

	if((this.state.valores[0][2] && this.state.valores[1][1] && this.state.valores[2][0])  === 'X'){
		alert("Ha ganado el jugador X");
	}

	if((this.state.valores[0][2] && this.state.valores[1][1] && this.state.valores[2][0])  === '0'){
		alert("Ha ganado el jugador 0");
	}

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++){
		
		// Contadores para coincidencias en fila de 3.
		var n1X = 0;
		var n2X = 0;
		var n1O = 0;
		var n2O = 0;

		for (var b = 0; b < 3; b++){

			// Comprobamos filas para el valor X
			if(this.state.valores[a][b] === 'X'){
				n1X++;
			}
			// Comprobamos columnas para el valor X
			if(this.state.valores[b][a] === '0'){
				n2X++;
			}
			// Comprobamos filas para el valor Y
			if(this.state.valores[a][b] === 'X'){
				n1Y++;
			}
			// Comprobamos columnas para el valor Y
			if(this.state.valores[b][a] === '0'){
				n2Y++;
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n1X === 3 || n2X === 3){
				alert("Ha ganado el jugador X");
				break;
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n1Y === 3 || n2Y === 3){
				alert("Ha ganado el jugador 0");
				break;
			}
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
	appClick: function(numeroFila, numeroColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
			valores: this.state.valores
		});
		compruebaGanador();
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