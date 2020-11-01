import { Message } from 'model/Message';
import React from 'react';

// メッセージ一覧
const MessageView: React.FC<{messageList: Message[]}> = ({messageList}) => {
  return <>
    {messageList.map(message => <div className="m-3 p-1 border">
      <span>{message.name}</span><br />
      <pre>{message.talk}</pre>
    </div>)
    }
  </>;
};

export default MessageView;
