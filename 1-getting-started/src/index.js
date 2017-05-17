import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width='75' src={props.avatar_url} alt="avatar" />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}
                </div>
                <div>{props.company}</div>
            </div>
        </div>
    )
}

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    )
}

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: ''
		}
	}

	handleSumbit = (e) => {
		e.preventDefault()
		axios.get(`https://api.github.com/users/${this.state.userName}`)
			.then(resp => {
				this.props.onSubmit(resp.data)
				this.setState({
					userName: ''
				})
			})
	}

	render() {
		return (
			<form onSubmit={this.handleSumbit} >
				<input type="text"
					value={this.state.userName}
					onChange={(e) => this.setState({userName: e.target.value})}
					placeholder="Github username"
					required />
				<button type="submit" >Add card</button>
			</form>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: []
		}
	}

	addNewCard = (cardInfo) => {
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardInfo)
		}))
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />
				<CardList cards={this.state.cards} />
			</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
