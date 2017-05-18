import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import _ from 'lodash'

const Stars = (props) => {
	return (
		<div className="col-md-5">
			{_.range(props.numberOfStars).map(i => 
				<i key={i} className="fa fa-star"></i>)}
		</div>
	)
}

const Button = (props) => {
	return (
		<div className="col-md-2" >
			<button className="btn" disabled={props.selectedNumbers.length === 0} >=</button>
		</div>
	)
}

const Answer = (props) => {
	return (
		<div className="col-md-5" >
			{props.selectedNumbers.map((number, i) => 
			<span key={i} onClick={() => props.unSelectNumber(number)} >{number}</span>)}
		</div>
	)
}

const Numbers = (props) => {
	const numberClassName = (number) => {
		if(props.selectedNumbers.indexOf(number) >=0) {
			return 'selected'
		}
	}

	return (
		<div className="card text-center" >
			<div>
				{Numbers.list.map((number, i) => 
					<span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)} >{number}</span>)}
			</div>
		</div>
	)
}
Numbers.list = _.range(1,10)

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedNumbers: [],
			randomNumberOfStars: 1 + Math.floor(Math.random()*9)
		}
	}

	selectNumber = (clickedNumber) => {
		if(this.state.selectedNumbers.indexOf(clickedNumber) >=0) {
			return
		}
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
		}))
	}

	unSelectNumber = (clickedNumber) => {
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers
				.filter(number => number !== clickedNumber)
		}))
	}

	render() {
		const { selectedNumbers, randomNumberOfStars } = this.state

		return(
			<div className="container" >
			<hr/>
				<h3>Play Nine</h3>
				<div className="row">
					<Stars numberOfStars={randomNumberOfStars} />
					<Button selectedNumbers={selectedNumbers} />
					<Answer selectedNumbers={selectedNumbers}
						unSelectNumber={this.unSelectNumber} />
				</div>
				<br/>
				<Numbers selectedNumbers={selectedNumbers}
					selectNumber={this.selectNumber} />
			</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Game />
			</div>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
