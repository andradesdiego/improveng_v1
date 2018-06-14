import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuSemantic extends Component {
  SignOut = props => {
    localStorage.gamerName = "";
    localStorage.playedGame = "";
    localStorage.token = "";
    localStorage.NumberQuizzes = "";
    localStorage.games = "";
  };

  render() {
    if (localStorage.gamerName !== "" && localStorage.gamerName !== "Diego Andrades") {
      return (
        <div id="rightMenu">
          <Menu secondary inverted>
            <Link to={""}>
              <img id="logo" src="../../images/improveng.png" alt="logo" />
            </Link>
           
            <Menu.Menu  position="right">
              <Menu.Item>
                <Link to={"/gamer"}>
                  <Button size="small" floated="right" inverted color="grey">
                    {localStorage.gamerName}
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={"/"}>
                  <Button
                    onClick={this.SignOut}
                    size="small"
                    floated="right"
                    inverted
                    color="grey"
                  >
                    Sign Out
                  </Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
           
            
          </Menu>
        </div>
      );
    } else if (localStorage.gamerName === "Diego Andrades") {
      return (
        <div>
          <Menu secondary inverted>
            <Link to={"/"}>
              <img id="logo" src="../../images/improveng.png" alt="logo" />
            </Link>
            <Menu.Menu position="right">
              <Menu.Item>
                <Link to={"/gamer"}>
                  <h3>Super Admin: {localStorage.gamerName}</h3>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={"/admin"}>
                  <Button size="small" floated="right" inverted color="grey">
                    Admin Panel
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={"/"}>
                  <Button
                    onClick={this.SignOut}
                    size="small"
                    floated="right"
                    inverted
                    color="grey"
                  >
                    Sign Out
                  </Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Menu secondary inverted>
            <Link to={"/"}>
              <img id="logo" src="../../images/improveng.png" alt="logo" />
            </Link>
          </Menu>
        </div>
      );
    }
  }
}
