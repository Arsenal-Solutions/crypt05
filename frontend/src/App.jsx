import React from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Homescreen from './components/homescreen/Homescreen';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";


export default class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/home" component={Homescreen}/>
    </BrowserRouter>

  }
}
