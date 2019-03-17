import React, { Component } from "react";
import "./App.css";
import Header from "./header/Header";
import Main from "./main/Main";
import Movie from "./movie/Movie";
import NotFound from "./NotFound";
import Login from "./page/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    code: 401
  };

  changeState = param => {
    this.setState({
      code: param
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          {this.state.code === 401 && <Login ubahState={this.changeState} />}
          {this.state.code === 200 && (
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/movie/:id" component={Movie} />
              <Route component={NotFound} />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
