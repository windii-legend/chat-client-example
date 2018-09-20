import React from 'react';
import Pusher from 'pusher-js/react-native';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';

import pusherConfig from './pusher';

import { GiftedChat } from 'react-native-gifted-chat';

const shortid = require('shortid');

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.pusher = new Pusher(pusherConfig.key, pusherConfig);

    this.chatChannel = this.pusher.subscribe('chat_channel');
    this.chatChannel.bind('pusher:subscription_succeeded', () => {
        this.chatChannel.bind('join', (data) => {
          this.handleJoin(data.name);
        });
        this.chatChannel.bind('part', (data) => {
          this.handlePart(data.name);
        });
        this.chatChannel.bind('message', (data) => {
          this.handleMessage(data.name, data.message);
        });
    });
    this.handleSendMessage = this.onSendMessage.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  handleJoin(name) {
    if(name == this.props.name) {return;}
    const id = shortid.generate();
    this.setState({
      messages: GiftedChat.append(
        this.state.messages,
        {
          _id: id,
          user: {name:name},
          text: 'ただいま参加いたしました！'
        }
      )
    });
  }

  handleMessage(name, message) {
    if(name == this.props.name) {return;}
    const id = shortid.generate();
    this.setState({
      messages: GiftedChat.append(
        this.state.messages,
        {
          _id: id,
          user: {name:name},
          text: message
        }
      )
    });
  }

  componentDidMount() {
    const payload = {
      name : this.props.name
    };
    fetch(`${pusherConfig.restServer}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  componentWillUnmount() {
    const payload = {
      name: this.props.name
    };
    fetch(`${pusherConfig.restServer}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  onSendMessage = (text) => {
    const payload = {
      name: this.props.name,
      message: text
    };
    fetch(`${pusherConfig.restServer}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }
  onSend(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    for(let message of messages) {
      this.onSendMessage(message.text);
    }

  }

  render() {
    const messages = this.state.messages;
    return (
      <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.id,
            name: this.props.name,
          }}
      />
    )
  }
}
