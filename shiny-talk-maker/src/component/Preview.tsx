import React, { useContext } from 'react';
import MessageView from 'component/MessageView';
import { ApplicationContext } from 'setvice/store';

// プレビュー表示
const Preview: React.FC = () => {
  const { nowMessage } = useContext(ApplicationContext);

  return <div className="border w-100">
    <MessageView messageList={[nowMessage]} />
  </div>;
};

export default Preview;
