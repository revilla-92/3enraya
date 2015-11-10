const Fila = require("./Fila.jsx");

var Tablero = React.createClass({ 
	getInitialState: function(){
		return {
			clicks: 0,
			valoresTablero: [
				['-', '-', '-'],
				['-', '-', '-'],
				['-', '-', '-']
			]
		};
	},
	manejadorClick: function(numeroFila, numeroCasilla){
		var valoresTablero = this.state.valoresTablero;
		var nuevoValor = 'X';
		if(this.state.clicks % 2 === 0){
			nuevoValor = 'O';
		}
		valoresTablero[numeroFila][numeroCasilla] = nuevoValor;
		this.setState({
			clicks: this.state.clicks + 1,
			valoresTablero: this.state.valoresTablero 
		});
	},
	render: function(){
		var filas = this.state.valoresTablero.map(function(fila, indice){	
			return (
				<Fila key={indice} valoresFila={fila} numeroFila={indice} manejadorClick={this.manejadorClick}/>
			)
		}.bind(this));
		return (
			<div>
				{filas}
			</div>
		);
	}
});

module.exports = Tablero;