import React, { useContext } from 'react';
import { Message } from 'model/Message';
import { ApplicationContext } from 'setvice/store';

// メッセージ一覧
const MessageView: React.FC<{messageList: Message[], startIndex?: number}> = ({messageList, startIndex=-1}) => {
  const { dispatch } = useContext(ApplicationContext);

  const onClickMessageView = (index: number) => dispatch({type: 'setSplitIndex', message: `${startIndex + index}`});

  return <>
    {messageList.map((message, index) =>
    <div className="m-3 p-1 border" onClick={() => onClickMessageView(index)}>
      <span>{message.name}</span><br />
      <pre>{message.talk}</pre>
    </div>)
    }
  </>;
};

export default MessageView;
