import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ApplicationInfo from 'component/ApplicationInfo';
import InputForm from 'component/InputForm';
import MessageView from 'component/MessageView';
import Title from 'component/Title';
import { Message } from 'model/Message';

// メイン画面
const MainView: React.FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  // メッセージを追加する
  const addMessage = (message: Message) => {
    setMessageList([...messageList, {...message}]);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col className="text-center">
          <Title />
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <ApplicationInfo />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <InputForm addMessage={addMessage} />
        </Col>
      </Row>
      {messageList.length > 0 &&
        <Row className="my-3">
          <Col className="border">
            <MessageView messageList={messageList} />
          </Col>
        </Row>
      }
    </Container>
  );
};

export default MainView;
