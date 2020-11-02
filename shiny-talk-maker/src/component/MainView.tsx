import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ApplicationInfo from 'component/ApplicationInfo';
import InputForm from 'component/InputForm';
import Title from 'component/Title';
import { ApplicationContext } from 'service/store';
import MessageListView from './MessageListView';

// メイン画面
const MainView: React.FC = () => {
  const { messageList } = useContext(ApplicationContext);

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
          <InputForm />
        </Col>
      </Row>
      {messageList.length > 0 &&
        <Row className="my-3">
          <Col className="border">
            <MessageListView />
          </Col>
        </Row>
      }
    </Container>
  );
};

export default MainView;
