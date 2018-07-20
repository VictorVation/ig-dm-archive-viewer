import React from 'react';
import moment from 'moment';
import { AutoSizer, List } from 'react-virtualized';

import NoConversation from './NoConversation.js';
import Message from './Message.js';

import './Conversation.css';

class Conversation extends React.PureComponent {
  rowRenderer = ({ key, index, style }) => (
    <Message
      key={key}
      message={this.props.selectedConversation.conversation[index]}
      style={style}
      username={this.props.username}
    />
  );

  render() {
    console.log(this.props.selectedConversation);
    if (!this.props.selectedConversation) {
      return <NoConversation />;
    }
    const { participants, conversation } = this.props.selectedConversation;
    const conversationLength = conversation.length;
    return (
      <div className="Conversation">
        <div className="Conversation-participant">
          <h3>
            {participants}{' '}
            <span className="small">
              ({conversationLength} messages sent since{' '}
              {moment(conversation[0].created_at).format('MMM Do YYYY')})
            </span>
          </h3>
        </div>

        <div className="Conversation-messages">
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                columnWidth="50%"
                rowCount={conversationLength}
                rowHeight={65}
                rowRenderer={this.rowRenderer}
                style={{ outline: 'none' }}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default Conversation;
