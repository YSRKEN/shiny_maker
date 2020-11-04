import React, { useContext } from 'react';
import MessageView from 'component/MessageView';
import { ApplicationContext } from 'service/store';

// プレビュー表示
const Preview: React.FC = () => {
  const { nowMessage } = useContext(ApplicationContext);

  return <MessageView messageList={[nowMessage]} />;
};

export default Preview;
