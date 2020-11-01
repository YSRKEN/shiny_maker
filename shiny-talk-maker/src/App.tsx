import React, { FormEvent, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

// キャラ一覧
type CharacterType = 'idol' | 'producer' | 'assistant' | 'other';
interface Character {
  shortName: string;
  fullName: string;
  type: CharacterType;
}
const CHARACTER_LIST: Character[] = [
  { shortName: '真乃', fullName: '櫻木真乃', type: 'idol' },
  { shortName: '灯織', fullName: '風野灯織', type: 'idol' },
  { shortName: 'めぐる', fullName: '八宮めぐる', type: 'idol' },
  { shortName: '恋鐘', fullName: '月岡恋鐘', type: 'idol' },
  { shortName: '摩美々', fullName: '田中摩美々', type: 'idol' },
  { shortName: '咲耶', fullName: '白瀬咲耶', type: 'idol' },
  { shortName: '結華', fullName: '三峰結華', type: 'idol' },
  { shortName: '霧子', fullName: '幽谷霧子', type: 'idol' },
  { shortName: '果穂', fullName: '小宮果穂', type: 'idol' },
  { shortName: '智代子', fullName: '園田智代子', type: 'idol' },
  { shortName: '樹里', fullName: '西城樹里', type: 'idol' },
  { shortName: '凛世', fullName: '杜野凛世', type: 'idol' },
  { shortName: '夏葉', fullName: '有栖川夏葉', type: 'idol' },
  { shortName: '甘奈', fullName: '大崎甘奈', type: 'idol' },
  { shortName: '甜花', fullName: '大崎甜花', type: 'idol' },
  { shortName: '千雪', fullName: '桑山千雪', type: 'idol' },
  { shortName: 'あさひ', fullName: '芹沢あさひ', type: 'idol' },
  { shortName: '冬優子', fullName: '黛冬優子', type: 'idol' },
  { shortName: '愛依', fullName: '和泉愛依', type: 'idol' },
  { shortName: '透', fullName: '浅倉透', type: 'idol' },
  { shortName: '円香', fullName: '樋口円香', type: 'idol' },
  { shortName: '小糸', fullName: '福丸小糸', type: 'idol' },
  { shortName: '雛菜', fullName: '市川雛菜', type: 'idol' },
  { shortName: 'プロデューサー', fullName: 'プロデューサー', type: 'producer' },
  { shortName: 'はづき', fullName: '七草はづき', type: 'assistant' },
  { shortName: '社長', fullName: '天井社長', type: 'other' },
  { shortName: '', fullName: 'その他', type: 'other' },
];

// メッセージ用の型
interface Message {
  name: string;
  talk: string;
  type: CharacterType;
}

// 名称からキャラを検索する
const findCharacterByFullName = (fullName: string) => {
  return CHARACTER_LIST.filter(c => c.fullName === fullName)[0];
};

// メッセージ一覧
const MessageView: React.FC<{messageList: Message[]}> = ({messageList}) => {
  return <>
    {messageList.map(message => <div className="m-3 p-1 border">
      <span>{message.name}</span><br />
      <pre>{message.talk}</pre>
    </div>)
    }
  </>;
};

// プレビュー表示
const Preview: React.FC<{message: Message}> = ({message}) => {
  return <div className="border w-100">
    <MessageView messageList={[message]} />
  </div>;
};

// メイン画面
const App: React.FC = () => {
  const [characterName, setCharacterName] = useState('櫻木真乃');
  const [otherName, setOtherName] = useState('観客');
  const [talk, setTalk] = useState('はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです');
  const [message, setMessage] = useState<Message>({
    name: '真乃', talk: 'はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです', type: 'idol'
  });

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
    alert(`${message.name}「${message.talk}」`);
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
    </Container>
  );
};

export default App;
