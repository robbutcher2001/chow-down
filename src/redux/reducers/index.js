import { combineReducers } from 'redux';

import GetIngredientsReducer from './getIngredientsReducer';

export default combineReducers({
    ingredients: GetIngredientsReducer
});