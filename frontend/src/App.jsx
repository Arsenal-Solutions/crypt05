import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from './components/Signup/Signup';
import TransferPage from './components/TransferPage/TransferPage'
import CodePage from "./components/CodePage/CodePage";
import ScanCodePage from "./components/ScanCodePage/ScanCodePage";
import SendPage from "./components/SendPage/SendPage";
import TransactionsPage from "./components/TransactionsPage/TransactionsPage";
import HomePage from "./components/HomePage/HomePage"


export default class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/transfer" component={TransferPage}/>
        <Route exact path="/code" component={CodePage}/>
        <Route exact path="/transactions" component={TransactionsPage}/>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/scanAndSend/:amount" component={ScanCodePage}/>
        <Route exact path="/send/:address/:amount" component={SendPage}/>
        <Route path ="/">
          <Redirect to={"/transfer"}/>
        </Route>
      </Switch>
    </BrowserRouter>

  }
}
