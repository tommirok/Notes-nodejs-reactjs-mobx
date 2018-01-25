import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import  App  from './App';
import Footer from './Footer';
import Login from './Login';
import { Provider } from "mobx-react";
import noteStore from '../stores/NoteStore';
import userStore from '../stores/UserStore';
import {
	  HashRouter as Router,
	  Route,
	  Link,
		Switch,
		Redirect
	} from 'react-router-dom';
const stores = { noteStore, userStore };
export default class NotesRoutes extends Component{

  render(){
    return(
			<Provider {...stores}>
			<Router>
	      <main>
	        <Header />
					<Switch>
						<Route exact path="/" component={App}/>
						<Route path="login" component={Login}/>


					</Switch>

	        <Footer />
	      </main>
			</Router>
		</Provider>
    )
  }
}
NotesRoutes.propTypes = {
  store: React.PropTypes.object,
};
