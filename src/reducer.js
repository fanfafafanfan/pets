//合并所有的reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { home } from './redux/home.redux';

export default combineReducers({user,home})