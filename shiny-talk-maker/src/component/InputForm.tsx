import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import Preview from 'component/Preview';
import { CHARACTER_LIST } from 'constant';
import { findCharacterByFullName } from 'setvice/utility';
import { ApplicationContext } from 'setvice/store';

// メッセージ一覧
const InputForm: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const [characterName, setCharacterName] = useState('櫻木真乃');
  const [otherName, setOtherName] = useState('観客');
  const [talk, setTalk] = useState('はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです');

  // 入力フォームの内容が変更された際、入力されることになるメッセージの内容を更新する
  useEffect(() => {
    const character = findCharacterByFullName(characterName);
    if (character.type !== 'other') {
      dispatch({type: 'setMessage', message: JSON.stringify({ name: character.shortName, talk, type: character.type })});
    } else {
      dispatch({type: 'setMessage', message: JSON.stringify({ name: otherName, talk, type: character.type })});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterName, otherName, talk]);

  const onChangeCharacterName = (e: FormEvent<any>) => setCharacterName(e.currentTarget.value);
  const onChangeOtherName = (e: FormEvent<any>) => setOtherName(e.currentTarget.value);
  const onChangeTalk = (e: FormEvent<any>) => setTalk(e.currentTarget.value);
  const onClickAddMessageButton = () => dispatch({type: 'addMessage'});

  return   <Form className="border px-3 pt-3">
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
    <Preview />
  </Form.Group>
  <Form.Group>
    <Button className="w-100" onClick={onClickAddMessageButton}>追加</Button>
  </Form.Group>
</Form>;
};

export default InputForm;
