import React, { Component } from 'react';

import Conversation from './components/Conversation.js';
import ConversationList from './components/ConversationList.js';
import UploadForm from './UploadForm.js';

import './App.css';
import 'react-virtualized/styles.css';

class App extends Component {
  state = {
    selectedConversation: null,
    messages: [],
    username: null
  };

  selectConversation = conversation =>
    this.setState({ selectedConversation: conversation });

  setMessages = messages =>
    this.setState({
      messages: messages.map(({ conversation, participants }) => {
        return {
          conversation: conversation.reverse(),
          participants: participants.filter(
            participant => participant !== this.state.username
          )
        };
      })
    });

  setUsername = username =>
    this.setState({
      username: username
    });

  render() {
    window.SU = this.setUsername;
    window.me = () => console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-subtitle"
            href="https://www.github.com/VictorVation/ig-dm-archive-viewer/"
          >
            GitHub
          </a>
          <h1 className="App-title">IG DM Archive Viewer</h1>
          {this.state.username && (
            <small className="App-username">
              Viewing as: {this.state.username}
            </small>
          )}
        </header>
        <div className="App-content">
          {!this.state.username && (
            <UploadForm
              setMessages={this.setMessages}
              setUsername={this.setUsername}
            />
          )}
          {this.state.username && (
            <React.Fragment>
              <ConversationList
                messages={this.state.messages}
                onConversationSelected={this.selectConversation}
                selectedConversation={this.state.selectedConversation}
              />
              <Conversation
                selectedConversation={this.state.selectedConversation}
                username={this.state.username}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
