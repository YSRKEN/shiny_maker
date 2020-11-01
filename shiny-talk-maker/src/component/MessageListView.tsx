import React, { useContext } from 'react';
import { ApplicationContext } from 'setvice/store';
import MessageView from 'component/MessageView';

// 登録したメッセージの一覧＋操作ボタン
const MessageListView: React.FC = () => {
  const { messageList } = useContext(ApplicationContext);

  return <MessageView messageList={messageList} />;
};

export default MessageListView;
