import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	let logger;
	let store;

	if (process.env.NODE_ENV === `development`) {
		logger = createLogger({collapsed: true});
		store = createStore(
			rootReducer,
			initialState,
			applyMiddleware(thunk, logger)
		);
	} else {
		store = createStore(
			rootReducer,
			initialState,
			applyMiddleware(thunk)
		);
	}

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		})
	}

	return store
}