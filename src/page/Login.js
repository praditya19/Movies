import React, { Component } from "react";
import Axios from "axios";

const API = "https://api.themoviedb.org/3";
const KEY = "5d16317ec483c239f8eb5c0a7e6e3a94";

class Login extends Component {
  state = {
    isLogin: false,
    username: "",
    password: "",
    reqToken: ""
  };

  componentDidMount() {
    this.getReqToken();
  }

  getReqToken = () => {
    Axios.get(`${API}/authentication/token/new?api_key=${KEY}`)
      .then(res => {
        console.log(res.data.request_token);
        this.setState({
          reqToken: res.data.request_token
        });
      })
      .catch(err => {
        console.log(err);
        alert("Password / username salah");
      });
  };

  handleLogin = () => {
    Axios.post(
      `${API}/authentication/token/validate_with_login?api_key=${KEY}`,
      {
        username: this.state.username,
        password: this.state.password,
        request_token: this.state.reqToken
      }
    )
      .then(res => {
        console.log(res);
        this.props.ubahState(res.status);
      })
      .catch(err => {
        console.log(err);
        alert("username / password salah");
      });
  };
  render() {
    console.log(this.state.reqToken, ">>>>");
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.username}
            onChange={e =>
              this.setState({
                username: e.target.value
              })
            }
            placeholder="Username"
          />
          <br />
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={e =>
              this.setState({
                password: e.target.value
              })
            }
            placeholder="password"
          />
          <br />
          <br />

          <button onClick={() => this.handleLogin()}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
