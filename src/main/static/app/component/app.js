var DropdownItem = React.createClass({
	_onClick: function() {
		console.log(this.props.item.id);
		this.props.onItemClick(this.props.item);
	},
	render: function() {
		return (
			<li ><a href="#" onClick={this._onClick}>{this.props.item.value}</a></li>
		);
	}
});

var DropdownList = React.createClass({
	render: function() {
		return (
			<ul className="dropdown-menu">
				{this.props.data.map(item =>
				  <DropdownItem key={item.id} item={item} onItemClick={this.props.onItemClick} />
				)}
			</ul>
		);
	}
});

var DropDown = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="dropdown">
			<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				{this.props.name}
				<span className="caret"></span>
			</button>
			<DropdownList data={this.props.options} onItemClick={this.props.onItemClick} />			
		</div>
      </div>
    );
  }
});



var Application = React.createClass({
	getInitialState: function() {
		return {banks: [],terms:[],selectedBank:{},selectedTerm:{}};
	},
	getBanks: function() {
		var self = this;
		$.get('/assets/json/banks.json',function(data) {
			self.setState({banks:data});
		});
	},
	getTerms : function() {
		var self = this;
		$.get('/assets/json/terms.json',function(data) {
			self.setState({terms:data});
		});
	},
	selectBank : function(bank) {
		console.log('Selected Bank : ' + bank);
		this.setState({selectedBank:bank});
	},
	selectTerm: function(term) {
		console.log('Selected Term : ' + term);
		this.setState({selectedTerm:term});
	},
	componentDidMount: function() {
		this.getBanks();
		this.getTerms();
	},
	render:function() {
		return (
			<div className="row">
				<div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
					<div className="center-panel">
						<div className="panel-body">
							<div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
								
							</div>
							<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
								<DropDown name="Select Bank" options={this.state.banks} onItemClick={this.selectBank}/>
							</div>
							<div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
								
							</div>
							<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
								<DropDown name="Select Term" options={this.state.terms} onItemClick={this.selectTerm}/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
					<div className="center-panel">
						<div className="panel-body">
							<div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
							</div>
							<div className="col-md-5 col-lg-5 col-sm-5 col-xs-5">
								Bank: {this.state.selectedBank.value}
							</div>
							<div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
							</div>
							<div className="col-md-5 col-lg-5 col-sm-5 col-xs-5">
								Term: {this.state.selectedTerm.value}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
ReactDOM.render(
  <Application />,
  document.getElementById('main')
);