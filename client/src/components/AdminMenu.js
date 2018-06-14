import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class AdminMenu extends Component {
  state = { activeItem: 'list' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    
    return (
          <Menu fluid vertical tabular>
            <Menu.Item name='list' active={activeItem === 'list'} onClick={this.handleItemClick} />
            <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick} />
            <Menu.Item name='add' active={activeItem === 'add'} onClick={this.handleItemClick} />
            <Menu.Item name='del' active={activeItem === 'del'} onClick={this.handleItemClick} />
          </Menu>
    )
  }
}