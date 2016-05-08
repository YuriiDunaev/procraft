import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../components/form/Form';
import * as FormActions from '../actions/FormActions';

class App extends Component {
	render() {

		return (
			<div className='app'>
				<Form 
					lang={this.props.lang}
					filter={this.props.filter}
					setFiltered={this.props.FormActions.setFiltered} 
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		lang        : state.Form.lang,
		filter      : state.Form.filter
	}
}

function mapDispatchToProps(dispatch) {
	return {
		FormActions: bindActionCreators(FormActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);