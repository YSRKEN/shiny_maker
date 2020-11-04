import React, { useContext, useRef } from 'react';
import useImage from 'use-image';
import { ApplicationContext } from 'service/store';
import { Layer, Rect, Stage } from 'react-konva';
import { MESSAGE_HEIGHT, MESSAGE_MARGIN, MESSAGE_WIDTH } from 'constant';
import frameIdol from 'asset/frame-idol.png';
import frameProducer from 'asset/frame-producer.png';
import frameAssistant from 'asset/frame-assistant.png';
import frameOther from 'asset/frame-other.png';
import { Stage as StageType } from 'konva/types/Stage';

import SingleMessageView from 'component/SingleMessageView';
import { Button, Form } from 'react-bootstrap';

// メッセージ一覧(全件表示用)
const AllMessageView: React.FC = () => {
  const { messageList, dispatch } = useContext(ApplicationContext);
  const [frameIdolImage] = useImage(frameIdol);
  const [frameProducerImage] = useImage(frameProducer);
  const [frameAssistantImage] = useImage(frameAssistant);
  const [frameOtherImage] = useImage(frameOther);
  const stageRef = useRef<StageType>(null);
  const typeToImage: { [key: string]: HTMLImageElement | undefined } = {
    'idol': frameIdolImage,
    'producer': frameProducerImage,
    'assistant': frameAssistantImage,
    'president': frameOtherImage,
    'other': frameOtherImage
  };

  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${index}` });
  const onClickSaveMessage = () => {
    const temp = stageRef.current;
    if (temp !== null) {
      const dataUrl = temp.toDataURL();
      const link = document.createElement('a');
      link.download = 'ohanashi.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const onClickDeleteAllMessage = () => {
    if (window.confirm('全てのメッセージを削除しますか？')) {
      dispatch({ type: 'deleteAllMessage' });
    }
  }

  // JavaScriptで、表示サイズを決定
  const clientWidth = document.body.clientWidth * 0.8;
  const width = Math.min(clientWidth, MESSAGE_WIDTH);
  const scale = 1.0 * width / MESSAGE_WIDTH;

  return <Form className="my-3">
    <div className="text-center">
      <Form.Group className="d-none d-sm-inline">
        <Button className="mr-3" onClick={onClickSaveMessage}>保存</Button>
        <Button variant="danger" onClick={onClickDeleteAllMessage}>全削除</Button>
      </Form.Group>
      <Form.Group className="d-inline d-sm-none">
        <Button className="mr-3">保存</Button>
        <Button variant="danger" onClick={onClickDeleteAllMessage}>全削除</Button>
      </Form.Group>
    </div>
    <Stage ref={stageRef}
      scale={{ x: scale, y: scale }}
      width={(MESSAGE_WIDTH + MESSAGE_MARGIN * 2) * scale}
      height={(MESSAGE_HEIGHT * messageList.length + MESSAGE_MARGIN * (messageList.length + 1)) * scale}>
      <Layer>
        <Rect
          width={MESSAGE_WIDTH + MESSAGE_MARGIN * 2}
          height={MESSAGE_HEIGHT * messageList.length + MESSAGE_MARGIN * (messageList.length + 1)}
          fill="white" />
      </Layer>
      {
        messageList.map((message, index) => {
          const widthOffset = MESSAGE_MARGIN;
          const heightOffset = (MESSAGE_HEIGHT + MESSAGE_MARGIN) * index + MESSAGE_MARGIN;
          return <SingleMessageView key={index} message={message} widthOffset={widthOffset} heightOffset={heightOffset}
            imageData={typeToImage[message.type as string]} onClick={() => onClickMessageView(index)} />
        })
      }
    </Stage>
  </Form>;
};

export default AllMessageView;
