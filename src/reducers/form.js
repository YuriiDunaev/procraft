import {
	SET_FILTERED
} from '../constants/FormConst'

const initialState = {
	lang: 'ru',
	filter: ''
};

export default function Form(state = initialState, action) {
	switch (action.type) {
		case SET_FILTERED:
			return {...state, filter: action.filter};
		default:
			return state;
	}
}