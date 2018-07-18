import React from "react";

import cx from "classnames";
import { AutoSizer, List } from "react-virtualized";

import "./ConversationList.css";

class ConversationList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    rowRenderer({ key, index, style }) {
        const message = this.props.messages[index];
        return (
            <li
                className={cx({
                    "ConversationList-item": true,
                    selected: message === this.props.selectedConversation
                })}
                key={key}
                style={{
                    ...style
                }}
                onClick={() => this.props.onConversationSelected(message)}
            >
                {`${message.participants.join(", ")} (${
                    message.conversation.length
                })`}
            </li>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <ul className="ConversationList">
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={messages.length}
                            rowHeight={50}
                            rowRenderer={this.rowRenderer}
                            style={{ outline: "none" }}
                        />
                    )}
                </AutoSizer>
            </ul>
        );
    }
}

export default ConversationList;
