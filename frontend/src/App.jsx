import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home'



export default class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/home" component={Home}/>
        <Route path ="/">
          <Redirect to={"/login"}/>
        </Route>
      </Switch>
    </BrowserRouter>

  }
}
