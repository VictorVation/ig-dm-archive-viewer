import React, { Component } from "react";

import Conversation from "./components/Conversation.js";
import ConversationList from "./components/ConversationList.js";

import "./App.css";
import "react-virtualized/styles.css";

import messages from "./messages.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.selectConversation = this.selectConversation.bind(this);
    this.state = {
      selectedConversation: null,
      messages: messages.map(({ conversation, participants }) => {
        return {
          conversation: conversation.reverse(),
          participants: participants.filter(
            participant => participant !== "victorvation"
          )
        };
      })
    };
  }

  selectConversation(conversation) {
    this.setState({ selectedConversation: conversation });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Instagram Direct Archive</h1>
        </header>
        <div className="App-content">
          <ConversationList
            onConversationSelected={this.selectConversation}
            selectedConversation={this.state.selectedConversation}
            messages={this.state.messages}
          />
          <Conversation
            selectedConversation={this.state.selectedConversation}
          />
        </div>
      </div>
    );
  }
}

export default App;
