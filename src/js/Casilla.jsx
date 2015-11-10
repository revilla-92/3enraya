const casillaStyle = { 
	height: '100px',
	width: '100px'
};

let Casilla = React.createClass({
	manejadorClick: function(){
		if(this.props.valor==="-"){
			this.props.manejadorClick(this.props.numeroCasilla);
		}
	},
	render: function(){
		return (
			<button className={this.props.valor==="-" ? "clickable":"no_clickable"} style={casillaStyle} onClick={this.manejadorClick}>
				{this.props.valor}
			</button>
		)
	}
});

module.exports = Casilla;