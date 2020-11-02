import React, { useContext } from 'react';
import { ApplicationContext } from 'setvice/store';
import MessageView from 'component/MessageView';
import { Button, Form } from 'react-bootstrap';

// 登録したメッセージの一覧＋操作ボタン
const MessageListView: React.FC = () => {
  const { messageList, messageListSplitIndex, dispatch } = useContext(ApplicationContext);

  const onClickInsertMessage = () => {
    dispatch({type: 'insertMessage'});
  }

  const onClickDeleteMessage = () => {
    if (window.confirm('このメッセージを削除しますか？')) {
      dispatch({type: 'deleteMessage'});
    }
  }
  
  const onClickDeleteAllMessage = () => {
    if (window.confirm('全てのメッセージを削除しますか？')) {
      dispatch({type: 'deleteAllMessage'});
    }
  }

  const onClickUpToMessage = () => {
    dispatch({type: 'upToMessage'});
  }

  const onClickDownToMessage = () => {
    dispatch({type: 'downToMessage'});
  }

  if (messageListSplitIndex < 0 || messageList.length <= messageListSplitIndex) {
    return <Form className="my-3">
      <div className="text-center">
        <Form.Group className="d-none d-sm-inline">
          <Button className="mr-3">保存</Button>
          <Button variant="danger" onClick={onClickDeleteAllMessage}>全削除</Button>
        </Form.Group>
        <Form.Group className="d-inline d-sm-none">
          <Button className="mr-3">保存</Button>
          <Button variant="danger" onClick={onClickDeleteAllMessage}>全削除</Button>
        </Form.Group>
      </div>
      <MessageView messageList={messageList} startIndex={0} />
    </Form>;
  } else {
    return <Form>
      <MessageView messageList={messageList.slice(0, messageListSplitIndex + 1)} startIndex={0} />
      <div className="text-center">
        <Form.Group className="d-none d-sm-inline">
          <Button className="mr-3" onClick={onClickInsertMessage}>挿入</Button>
          <Button className="mr-3" onClick={onClickUpToMessage} disabled={messageListSplitIndex === 0}>∧</Button>
          <Button className="mr-3" onClick={onClickDownToMessage} disabled={messageListSplitIndex === messageList.length - 1}>∨</Button>
          <Button className="mr-3" variant="warning">転送</Button>
          <Button className="mr-3" variant="warning">上書</Button>
          <Button variant="danger" onClick={onClickDeleteMessage}>削除</Button>
        </Form.Group>
        <Form.Group className="d-inline d-sm-none">
          <Button size="sm" className="mr-2" onClick={onClickInsertMessage}>挿入</Button>
          <Button size="sm" className="mr-2" onClick={onClickUpToMessage} disabled={messageListSplitIndex === 0}>∧</Button>
          <Button size="sm" className="mr-2" onClick={onClickDownToMessage} disabled={messageListSplitIndex === messageList.length - 1}>∨</Button>
          <Button size="sm" className="mr-2" variant="warning">転送</Button>
          <Button size="sm" className="mr-2" variant="warning">上書</Button>
          <Button size="sm" variant="danger" onClick={onClickDeleteMessage}>削除</Button>
        </Form.Group>
      </div>
      <MessageView messageList={messageList.slice(messageListSplitIndex + 1, messageList.length)} startIndex={messageListSplitIndex + 1} />
    </Form>;
  }
};

export default MessageListView;
