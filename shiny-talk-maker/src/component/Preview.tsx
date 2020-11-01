import React from 'react';
import MessageView from 'component/MessageView';
import { Message } from 'model/Message';

// プレビュー表示
const Preview: React.FC<{message: Message}> = ({message}) => {
  return <div className="border w-100">
    <MessageView messageList={[message]} />
  </div>;
};

export default Preview;
