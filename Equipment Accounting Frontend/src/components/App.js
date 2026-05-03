import * as React from "react";
import AppContent from "../components/AppContent";
import Header from "../components/Header";
import logo from "../logo.svg";
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "equipment"
    };
  }

  setPage = (page) => {
    this.setState({ page });
  };

  render() {

    return (
      <div className="app-container">

        <Header
          logoSrc={logo}
          login={this.props.login}
          logout={this.props.logout}
          user={this.props.user}
        />

        <div className="main-layout">

          <div className="sidebar">

            <ul className="menu-list">

              <li
                className="menu-item"
                onClick={() => this.setPage("equipment")}
              >
                Оборудование
              </li>

              <li
                className="menu-item"
                onClick={() => this.setPage("employers")}
              >
                Сотрудники
              </li>

              <li
                className="menu-item"
                onClick={() => this.setPage("departments")}
              >
                Департаменты
              </li>

            </ul>

          </div>

          <div className="content">

            <AppContent page={this.state.page} />

          </div>

        </div>

      </div>
    );
  }
}

export default App;