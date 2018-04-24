import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import JiuzhuInfo from './container/jiuzhuinfo/jiuzhuinfo'
import LingyangInfo from './container/lingyang/lingyanginfo'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
//发帖，我的，消息
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/lingyanginfo' component={LingyangInfo}/>
					<Route path='/jiuzhuinfo' component={JiuzhuInfo}/>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={Register}/>
					<Route component={Dashboard}/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)