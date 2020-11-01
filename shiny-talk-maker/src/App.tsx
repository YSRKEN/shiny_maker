import MessageView from 'component/MessageView';
import Preview from 'component/Preview';
import { CHARACTER_LIST } from 'constant';
import { Message } from 'model/Message';
import React, { FormEvent, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { findCharacterByFullName } from 'setvice/utility';

// メイン画面
const App: React.FC = () => {
  const [characterName, setCharacterName] = useState('櫻木真乃');
  const [otherName, setOtherName] = useState('観客');
  const [talk, setTalk] = useState('はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです');
  const [message, setMessage] = useState<Message>({
    name: '真乃', talk: 'はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです', type: 'idol'
  });
  const [messageList, setMessageList] = useState<Message[]>([]);

  // 入力フォームの内容が変更された際、入力されることになるメッセージの内容を更新する
  useEffect(() => {
    const character = findCharacterByFullName(characterName);
    if (character.type !== 'other') {
      setMessage({name: character.shortName, talk, type: character.type});
    } else {
      setMessage({name: otherName, talk, type: character.type});
    }
  }, [characterName, otherName, talk]);

  const onChangeCharacterName = (e: FormEvent<any>) => setCharacterName(e.currentTarget.value);
  const onChangeOtherName = (e: FormEvent<any>) => setOtherName(e.currentTarget.value);
  const onChangeTalk = (e: FormEvent<any>) => setTalk(e.currentTarget.value);
  const addMessage = () => {
    setMessageList([...messageList, {...message}]);
  };

  return (
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
              <Form.Control as="select" value={characterName} onChange={onChangeCharacterName}>
                {CHARACTER_LIST.map(character => <option key={character.fullName}>{character.fullName}</option>)}
              </Form.Control>
              {findCharacterByFullName(characterName).type === 'other' && <Form.Control className="mt-3" value={otherName} onChange={onChangeOtherName} />}
            </Form.Group>
            <Form.Group>
              <Form.Label>発言</Form.Label>
              <Form.Control as="textarea" rows={3} value={talk} onChange={onChangeTalk}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>プレビュー</Form.Label>
              <Preview message={message} />
            </Form.Group>
            <Form.Group>
              <Button className="w-100" onClick={addMessage}>追加</Button>
            </Form.Group>
          </Form>
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

export default App;
