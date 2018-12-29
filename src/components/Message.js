import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import './Message.css';

function formatContent(message) {
  const {
    heart,
    story_share,
    media,
    media_share_caption,
    media_share_url,
    media_owner,
    text
  } = message;
  if (story_share) {
    return story_share;
  }
  if (heart) {
    return heart;
  }
  if (media_share_caption) {
    return (
      <a href={media_share_url}>
        Shared {media_owner}'s post: {media_share_caption}
      </a>
    );
  }
  if (media) {
    return (
      <a href={media}>
        <img src={media} alt="Direct Image" />
      </a>
    );
  }
  if (text) {
    return text;
  }
}

export default function Message({ message, style, username }) {
  const { created_at, sender } = message;

  return (
    <div
      className={cx({
        Message: true,
        mine: sender === username
      })}
      style={style}
    >
      {formatContent(message)}
      <br />
      <em className="timestamp">
        {moment(created_at).format('MMM Do YYYY, h:mm:ss a')}
      </em>
    </div>
  );
}
