import React, { useContext } from 'react';
import { ApplicationContext } from 'setvice/store';
import MessageView from 'component/MessageView';
import { Button, Form } from 'react-bootstrap';

// 登録したメッセージの一覧＋操作ボタン
const MessageListView: React.FC = () => {
  const { messageList, messageListSplitIndex } = useContext(ApplicationContext);

  if (messageListSplitIndex < 0 || messageList.length <= messageListSplitIndex) {
    return <MessageView messageList={messageList} />;
  } else {
    return <Form>
      <MessageView messageList={messageList.slice(0, messageListSplitIndex + 1)} />
      <Form.Group>
        <Button className="mr-3">挿入</Button>
        <Button className="mr-3">∧</Button>
        <Button className="mr-3">∨</Button>
        <Button className="mr-3" variant="warning">転送</Button>
        <Button className="mr-3" variant="warning">上書</Button>
        <Button className="mr-3"  variant="danger">削除</Button>
      </Form.Group>
      <MessageView messageList={messageList.slice(messageListSplitIndex + 1, messageList.length)} />
    </Form>;
  }
};

export default MessageListView;
