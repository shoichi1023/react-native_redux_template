import { combineReducers } from 'redux';
import navReducer from './navReducer';

const allReducers = combineReducers({
	nav:navReducer,
});

export default allReducers;