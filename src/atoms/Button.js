import React, { Component } from 'react';
import styles from './button.less';

export default class Button extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type        : this.props.type !== undefined ? this.props.type : 'submit',
			text        : this.props.text !== undefined ? this.props.text : 'кнопка',
			className   : this.props.className !== undefined ? this.props.className : styles.button
		};
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		console.log('render Button');
		return (
			<button
				type={this.state.type}
				className={this.state.className}
			>
				{this.state.text}
			</button>
		)
	}
}