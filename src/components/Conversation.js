import React from "react";
import { AutoSizer, List } from "react-virtualized";

import NoConversation from "./NoConversation.js";
import Message from "./Message.js";

import "./Conversation.css";

class Conversation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    rowRenderer({ key, index, style }) {
        return (
            <Message
                key={key}
                message={this.props.selectedConversation.conversation[index]}
                style={style}
            />
        );
    }

    render() {
        console.log(this.props.selectedConversation);
        if (!this.props.selectedConversation) {
            return <NoConversation />;
        }
        const { participants, conversation } = this.props.selectedConversation;
        return (
            <div className="Conversation">
                <div className="Conversation-participant">
                    <h3>{participants}</h3>
                </div>

                <div className="Conversation-messages">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                columnWidth="50%"
                                rowCount={conversation.length}
                                rowHeight={65}
                                rowRenderer={this.rowRenderer}
                                style={{ outline: "none" }}
                            />
                        )}
                    </AutoSizer>
                </div>
            </div>
        );
    }
}

export default Conversation;
