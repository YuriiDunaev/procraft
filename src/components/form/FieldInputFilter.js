import React, { Component } from 'react';
import styles from './field_input_filter.less';

export default class FieldInputFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id          : this.props.id !== undefined ? this.props.id : this._reactInternalInstance._rootNodeID,
			type        : this.props.type !== undefined ? this.props.type : 'text',
			className   : this.props.className !== undefined ? this.props.className : styles.field_input,
			items       : [],
			focus       : false
		};
	}

	/**
	 * Отслеживаем изменение store
	 * @param e - event
	 */
	componentDidUpdate(after) {
		return after.filter !== this.props.filter;
	}

	/**
	 * Отслеживаем событие keyup у инпута
	 * @param e - event
	 */
	onKeyUp(e) {
		this.filterFields(e.currentTarget.value);
	}


	/**
	 * Отслеживаем событие onblur у инпута
	 * @param e - event
	 */
	onBlur() {
		this.setState({items: []});
		this.props.setFiltered('');
	}

	/**
	 * фильтруем поля
	 * @param str
	 */
	filterFields(str) {
		let fields = [];
		
		for (let i = 0; i < this.props.fields.length; i++) {
			let obj = this.props.fields[i];
			let reg = new RegExp(str, 'i');

			if ( obj.search(reg) !== -1 ) {
				let item = obj.replace(reg, (match) => {
					return '<b>' + match + '</b>';
				});

				fields.push(item);
			}
		}

		this.props.setFiltered(str);
		this.setState({items: fields});
	}

	/**
	 * отслеживаем клик по ссылке
	 * @param e
	 */
	linkOnClick(e) {
		e.preventDefault();

		this.refs.input.value = e.currentTarget.textContent;
		this.refs.input.blur();
	}

	render() {
		console.log('render FieldInput');

		let list = this.state.items.map((item , index) => {
			return (
				<a
					className={styles.link}
					href="#!"
					key={index}
					dangerouslySetInnerHTML={{__html: item}}
				    onMouseDown={this.linkOnClick.bind(this)}
				></a>
			)
		});

		return (
			<div className={styles.field_input_filter}>
				<input
					ref="input"
					id={this.state.id}
					type={this.state.type}
					className={this.state.className}
					autoComplete="off"
					onKeyUp={this.onKeyUp.bind(this)}
					onBlur={this.onBlur.bind(this)}
				/>
				<div ref="popup" className={styles.popup}>{list}</div>
			</div>
		)
	}
}