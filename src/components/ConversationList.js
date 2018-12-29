import React from 'react';

import cx from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import './ConversationList.css';

export default function ConversationList(props) {
  const rowRenderer = ({ key, index, style }) => {
    const message = props.messages[index];
    return (
      <li
        className={cx({
          'ConversationList-item': true,
          selected: message === props.selectedConversation
        })}
        key={key}
        style={{
          ...style
        }}
        onClick={() => props.onConversationSelected(message)}
      >
        {message.participants.join(', ')} ({message.conversation.length})
      </li>
    );
  };

  const { messages } = props;
  if (messages == null) {
    debugger;
    return null;
  }
  return (
    <ul className="ConversationList">
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={messages.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
            style={{ outline: 'none' }}
          />
        )}
      </AutoSizer>
    </ul>
  );
}
