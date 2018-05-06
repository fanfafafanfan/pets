import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import JiuzhuInfo from './container/jiuzhuinfo/jiuzhuinfo'
import LingyangInfo from './container/lingyanginfo/lingyanginfo'
import NewPost from './component/home/newpost'
import PostDetail from './component/home/postdetail'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import Chat from './component/msg/chat'
import Mypost from './component/me/mypost'
import Postupdate from './component/me/postupdate'
import Myfavor from './component/me/myfavor'
import Reviseme from './component/me/reviseme'
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
					<Route path='/reviseme' component={Reviseme}/>
					<Route path='/postupdate/:postid/:title/:content' component={Postupdate}/>
					<Route path='/mypost' component={Mypost}/>
					<Route path='/myfavor' component={Myfavor}/>
					<Route path='/postdetail/:postid' component={PostDetail}/>
					<Route path='/newpost' component={NewPost}/>
					<Route path='/lingyanginfo' component={LingyangInfo}/>
					<Route path='/jiuzhuinfo' component={JiuzhuInfo}/>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={Register}/>
					<Route path='/chat/:userid' component={Chat}/>
					<Route component={Dashboard}/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)