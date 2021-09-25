import React from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home'



export default class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/Home" component={Home}/>
    </BrowserRouter>

  }
}
