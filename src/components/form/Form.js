import React, { Component, PropTypes } from 'react';
import styles from './form.less';
import input from './../../atoms/field_input.less';
import FieldInput from '../../atoms/FieldInput';
import Button from '../../atoms/Button';
import FieldInputFilter from './FieldInputFilter';
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../../node_modules/react-intl-tel-input/dist/libphonenumber';
import '../../../node_modules/react-intl-tel-input/dist/main.css';

export default class Form extends Component {
	static propTypes = {
		lang        : PropTypes.string.isRequired,
		filter      : PropTypes.string.isRequired
	};

	render() {
		console.log('render Form', this.props);
		return <div className={styles.form}>
				<form action="/">
					<h1 className={styles.title}>
						<b>Зарегистрируйтесь</b> и начните продавать<br/>
						услуги через интеренет сегодня
					</h1>
					<div className={styles.group}>
						<div className={styles.field}>
							<label htmlFor="first_name" className={styles.label}>имя</label>
							<FieldInput id="first_name" type="text" />
						</div>
						<div className={styles.field}>
							<label htmlFor="second_name" className={styles.label}>фамилия</label>
							<FieldInput id="second_name" type="text" />
						</div>
					</div>
					<div className={styles.field}>
						<label htmlFor="post" className={styles.label}>профессия</label>
						<FieldInputFilter
							id="post"
							type="text"
							fields={[
								"Адвокат",
								"Генеральный секретарь",
								"Делопроизводитель",
								"Детектив",
								"Дипломат",
								"Конвоир",
								"Милиционер",
								"Министр",
								"Нотариус",
								"Охранник",
								"Полицейский",
								"Правовед",
								"Прокурор",
								"Следователь",
								"Судебный пристав",
								"Судья",
								"Телохранитель",
								"Парикмахер",
								"Парикмахер-Визажист"
							]}
							filter={this.props.filter}
							setFiltered={this.props.setFiltered}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="phone" className={styles.label}>телефон</label>
						<IntlTelInput
							defaultCountry={this.props.lang}
							onlyCountries={['ru', 'us', 'tw']}
							preferredCountries=""
							css={['intl-tel-input', 'form-control '  + input.field_input]}
							utilsScript={'libphonenumber.js'}
						/>
					</div>

					<div className={styles.field_button}>
						<Button text="Зарегистрироваться" />
					</div>
				</form>
			</div>
	}
}