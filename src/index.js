import React from 'react';
import ReactDom from 'react-dom'
import App from './App'
import { counter, addGUN, removeGUN, addGunAsync } from "./index.redux";
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

const store = createStore(counter,applyMiddleware(thunk))

function render() {
    ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} addGunAsync={addGunAsync}/>,document.getElementById('root'))    
}

render()
store.subscribe(render)