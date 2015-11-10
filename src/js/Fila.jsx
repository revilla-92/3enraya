const Casilla = require("./Casilla.jsx");

var Fila = React.createClass({
	manejadorClick: function(numeroCasilla){
		this.props.manejadorClick(this.props.numeroFila, numeroCasilla); 
	},
	render: function(){
		var casillas = this.props.valoresFila.map(function(valor, indice){
			return (
				<Casilla valor={valor} key={indice} numeroCasilla={indice} manejadorClick={this.manejadorClick} />
			);
		}.bind(this));
		return (
			<div>
				{casillas}
			</div>
		);
	}
});

module.exports = Fila;