import React from 'react';
import Login from './Login';
import ChatClient from './ChatClient';
const shortid = require('shortid');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitName = this.onSubmitName.bind(this);
    this.state = {
      hasName: false
    }
  }
  onSubmitName(e) {
    const name = e.nativeEvent.text;
    this.setState({
      id: shortid.generate(),
      name,
      hasName: true
    });
  }
  render() {
    if(this.state.hasName) {
      return (
        <ChatClient id={this.state.id} name={this.state.name} />
      );
    } else {
      return (
        <Login onSubmitName={this.handleSubmitName}/>
      );
    }
  }
}
