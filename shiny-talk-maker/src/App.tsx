import React from 'react';
import { Col, Container, Form, Row, Button} from 'react-bootstrap';

// 仮実装
const Preview: React.FC = () => <div className="border w-100" style={{height: 100}}></div>;

const App: React.FC = () => (
    <Container>
      <Row className="my-3">
        <Col className="text-center">
          <h1 className="d-none d-sm-inline">シャニマス会話メーカー</h1>
          <h3 className="d-inline d-sm-none">シャニマス会話メーカー</h3>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <span>Ver.2.0.0　<a href="https://github.com/YSRKEN/shiny_maker" rel="noreferrer" target="_blank">GitHub</a>
          　<a href="https://twitter.com/YSRKEN" rel="noreferrer" target="_blank">作者のTwitter</a></span>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Form className="border px-3 pt-3">
            <Form.Group>
              <Form.Label>キャラ名</Form.Label>
              <Form.Control as="select">

              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>発言</Form.Label>
              <Form.Control as="textarea" rows={3}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>プレビュー</Form.Label>
              <Preview />
            </Form.Group>
            <Form.Group>
              <Button className="w-100">追加</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
);

export default App;
