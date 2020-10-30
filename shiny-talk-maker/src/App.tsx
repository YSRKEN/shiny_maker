import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

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
    </Container>
);

export default App;
