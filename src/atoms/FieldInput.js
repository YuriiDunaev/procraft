import React, { Component } from 'react';
import styles from './field_input.less';

export default class FieldInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id          : this.props.id !== undefined ? this.props.id : this._reactInternalInstance._rootNodeID,
			type        : this.props.type !== undefined ? this.props.type : 'text',
			className   : this.props.className !== undefined ? this.props.className : styles.field_input
		};
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		console.log('render FieldInput');
		return (
			<input
				id={this.state.id}
				type={this.state.type}
				className={this.state.className}
			/>
		)
	}
}