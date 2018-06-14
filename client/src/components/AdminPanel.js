import React, { Component } from "react";
//import AdminMenu from './AdminMenu'
import AdminListQuizzes from "./AdminListQuizzes";
import AdminSearchQuiz from "./AdminSearchQuiz";
import AdminAddQuiz from "./AdminAddQuiz";
import AdminDelQuiz from "./AdminDelQuiz";
import { Grid, Menu } from "semantic-ui-react";

export default class AdminPanel extends Component {
  state = { activeItem: "list" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    switch (activeItem) {
      case "list":
        return (
          <div id="adminContainer">
            <Grid>
              <div id="adminMenu">
                <Grid.Column width={4}>
                  {/* <AdminMenu name="list" activeItem={this.props.name}/> */}
                  <Menu fluid vertical tabular inverted>
                    <Menu.Item
                      name="list"
                      active={activeItem === "list"}
                      onClick={this.handleItemClick}
                    >
                      <h3>List all quizzes</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Search a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="add"
                      active={activeItem === "add"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Add a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="del"
                      active={activeItem === "del"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Delete a quiz</h3>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </div>

              <Grid.Column width={12}>
                <AdminListQuizzes />
              </Grid.Column>
            </Grid>
          </div>
        );
      case "search":
        return (
          <div id="adminContainer">
            <Grid>
              <div id="adminMenu">
                <Grid.Column width={4}>
                  {/* <AdminMenu name="list" activeItem={this.props.name}/> */}
                  <Menu fluid vertical tabular inverted>
                    <Menu.Item
                      name="list"
                      active={activeItem === "list"}
                      onClick={this.handleItemClick}
                    >
                      <h3>List all quizzes</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Search a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="add"
                      active={activeItem === "add"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Add a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="del"
                      active={activeItem === "del"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Delete a quiz</h3>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </div>
              <Grid.Column width={12}>
                <AdminSearchQuiz />
              </Grid.Column>
            </Grid>
          </div>
        );
      case "add":
        return (
          <div id="adminContainer">
            <Grid>
              <div id="adminMenu">
                <Grid.Column width={4}>
                  {/* <AdminMenu name="list" activeItem={this.props.name}/> */}
                  <Menu fluid vertical tabular inverted>
                    <Menu.Item
                      name="list"
                      active={activeItem === "list"}
                      onClick={this.handleItemClick}
                    >
                      <h3>List all quizzes</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Search a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="add"
                      active={activeItem === "add"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Add a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="del"
                      active={activeItem === "del"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Delete a quiz</h3>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </div>
              <Grid.Column width={12}>
                <AdminAddQuiz />
              </Grid.Column>
            </Grid>
          </div>
        );
      case "del":
        return (
          <div id="adminContainer">
            <Grid>
              <div id="adminMenu">
                <Grid.Column width={4}>
                  {/* <AdminMenu name="list" activeItem={this.props.name}/> */}
                  <Menu fluid vertical tabular inverted>
                    <Menu.Item
                      name="list"
                      active={activeItem === "list"}
                      onClick={this.handleItemClick}
                    >
                      <h3>List all quizzes</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Search a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="add"
                      active={activeItem === "add"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Add a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="del"
                      active={activeItem === "del"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Delete a quiz</h3>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </div>
              <Grid.Column width={12}>
                <AdminDelQuiz />
              </Grid.Column>
            </Grid>
          </div>
        );
      default:
        return (
          <div id="adminContainer">
            <Grid>
              <div id="adminMenu">
                <Grid.Column width={4}>
                  {/* <AdminMenu name="list" activeItem={this.props.name}/> */}
                  <Menu fluid vertical tabular inverted>
                    <Menu.Item
                      name="list"
                      active={activeItem === "list"}
                      onClick={this.handleItemClick}
                    >
                      <h3>List all quizzes</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Search a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="add"
                      active={activeItem === "add"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Add a quiz</h3>
                    </Menu.Item>
                    <Menu.Item
                      name="del"
                      active={activeItem === "del"}
                      onClick={this.handleItemClick}
                    >
                      <h3>Delete a quiz</h3>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </div>
              <Grid.Column width={12}>
                <AdminListQuizzes />
              </Grid.Column>
            </Grid>
          </div>
        );
    }
  }
}
