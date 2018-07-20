import React from "react";
import cx from "classnames";
import moment from "moment";

import "./Message.css";

function Message({ message, style, username }) {
    console.log(message);
    window.moment = moment;
    const {
        created_at,
        heart,
        media,
        media_share_caption,
        media_share_url,
        media_owner,
        text,
        sender,
        story_share
    } = message;

    let content = "<empty>";
    if (story_share) {
        content = story_share;
    }
    if (heart) {
        content = heart;
    }
    if (media_share_caption) {
        content = (
            <a href={media_share_url}>
                Shared {media_owner}'s post: {media_share_caption}
            </a>
        );
    }
    if (media) {
        content = <a href={media}>direct image</a>;
    }
    if (text) {
        content = text;
    }

    return (
        <div
            className={cx({
                Message: true,
                mine: sender === username
            })}
            style={style}
        >
            {content}
            <br />
            <em className="timestamp">
                {moment(created_at).format("MMM Do YYYY, h:mm:ss a")}
            </em>
        </div>
    );
}

export default Message;
