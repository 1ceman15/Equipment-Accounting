import * as React from "react";
import { toast } from "react-toastify";
import { getUser, login, logout } from "../helpers/auth_helper";

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    getUser().then(user => {
      if (user) {
        toast.success("Авторизация прошла успешно.");
      } else {
        toast.info("Вы не вошли.");
      }
      this.setState({ user });
      if (this.props.onUserChange) {
        this.props.onUserChange(user);
      }
    });
  };

  handleLogin = () => {
    login();
  };

  handleLogout = () => {
    logout();
    this.setState({ user: null });
    if (this.props.onUserChange) {
      this.props.onUserChange(null);
    }
  };

  render() {
    return (
      <header className="App-header">

        <div className="header-left">
          <img src={this.props.logoSrc} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.pageTitle}</h1>
        </div>

        <div className="header-right">

          {!this.state.user && (
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Войти
            </button>
          )}

          {this.state.user && (
            <button className="btn btn-dark" onClick={this.handleLogout}>
              Выйти
            </button>
          )}

        </div>

      </header>
    );
  }
}