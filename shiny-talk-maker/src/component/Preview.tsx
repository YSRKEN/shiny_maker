import React from 'react';
import { Message } from 'model/Message';
import MessageView from 'component/MessageView';

// プレビュー表示
const Preview: React.FC<{message: Message}> = ({message}) => {
  return <div className="border w-100">
    <MessageView messageList={[message]} />
  </div>;
};

export default Preview;
