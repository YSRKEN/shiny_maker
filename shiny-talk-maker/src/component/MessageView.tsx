import React, { useContext } from 'react';
import useImage from 'use-image';
import { Message } from 'model/Message';
import { ApplicationContext } from 'service/store';
import { Stage } from 'react-konva';
import { MESSAGE_HEIGHT, MESSAGE_MARGIN, MESSAGE_WIDTH } from 'constant';
import frameIdol from 'asset/frame-idol.png';
import frameProducer from 'asset/frame-producer.png';
import frameAssistant from 'asset/frame-assistant.png';
import frameOther from 'asset/frame-other.png';

import SingleMessageView from 'component/SingleMessageView';

// メッセージ一覧
const MessageView: React.FC<{ messageList: Message[], startIndex?: number }> = ({ messageList, startIndex = -1 }) => {
  const { dispatch } = useContext(ApplicationContext);
  const [frameIdolImage] = useImage(frameIdol);
  const [frameProducerImage] = useImage(frameProducer);
  const [frameAssistantImage] = useImage(frameAssistant);
  const [frameOtherImage] = useImage(frameOther);
  const typeToImage: {[key: string]: HTMLImageElement | undefined} = {
    'idol': frameIdolImage,
    'producer': frameProducerImage,
    'assistant': frameAssistantImage,
    'president': frameOtherImage,
    'other': frameOtherImage
  };

  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${startIndex + index}` });

  // JavaScriptで、表示サイズを決定
  const clientWidth = document.body.clientWidth * 0.8;
  const width = Math.min(clientWidth, MESSAGE_WIDTH);
  const scale = 1.0 * width / MESSAGE_WIDTH;

  return <Stage scale={{x: scale, y: scale}} width={MESSAGE_WIDTH * scale} height={(MESSAGE_HEIGHT * messageList.length + MESSAGE_MARGIN * (messageList.length - 1)) * scale}>
    {
      messageList.map((message, index) => {
        const heightOffset = (MESSAGE_HEIGHT + MESSAGE_MARGIN) * index;
        return <SingleMessageView key={index} message={message} heightOffset={heightOffset}
          imageData={typeToImage[message.type as string]} onClick={() => onClickMessageView(index)} />
      })
    }
  </Stage>
};

export default MessageView;
