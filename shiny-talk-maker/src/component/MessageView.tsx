import React, { useContext, useEffect, useRef } from 'react';
import { Message } from 'model/Message';
import { ApplicationContext } from 'service/store';
import { Layer, Stage, Text, Image } from 'react-konva';
import { MESSAGE_FONT_FAMILY, MESSAGE_HEIGHT, MESSAGE_MARGIN, MESSAGE_NAME_X, MESSAGE_NAME_Y, MESSAGE_TALK_FONT_SIZE, MESSAGE_TALK_X, MESSAGE_TALK_Y, MESSAGE_WIDTH } from 'constant';
import frameIdol from 'asset/frame-idol.png';
import frameProducer from 'asset/frame-producer.png';
import frameAssistant from 'asset/frame-assistant.png';
import frameOther from 'asset/frame-other.png';
import useImage from 'use-image';
import { Stage as StageType } from 'konva/types/Stage';

// メッセージ一覧
const MessageView: React.FC<{ messageList: Message[], startIndex?: number }> = ({ messageList, startIndex = -1 }) => {
  const { saveFlg, dispatch } = useContext(ApplicationContext);
  const [frameIdolImage] = useImage(frameIdol);
  const [frameProducerImage] = useImage(frameProducer);
  const [frameAssistantImage] = useImage(frameAssistant);
  const [frameOtherImage] = useImage(frameOther);
  const stageRef = useRef<StageType>(null);
  const typeToImage: {[key: string]: HTMLImageElement | undefined} = {
    'idol': frameIdolImage,
    'producer': frameProducerImage,
    'assistant': frameAssistantImage,
    'president': frameOtherImage,
    'other': frameOtherImage
  };

  useEffect(() => {
    if (startIndex === 0 && saveFlg) {
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
      dispatch({type: 'setSaveFlgFalse'});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveFlg]);

  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${startIndex + index}` });

  // JavaScriptで、表示サイズを決定
  const clientWidth = document.body.clientWidth * 0.8;
  const width = Math.min(clientWidth, MESSAGE_WIDTH);
  const scale = 1.0 * width / MESSAGE_WIDTH;
  console.log(scale);

  return <Stage ref={stageRef} scale={{x: scale, y: scale}} width={MESSAGE_WIDTH * scale} height={(MESSAGE_HEIGHT * messageList.length + MESSAGE_MARGIN * (messageList.length - 1)) * scale}>
    {
      messageList.map((message, index) => {
        const heightOffset = (MESSAGE_HEIGHT + MESSAGE_MARGIN) * index;
        return <Layer key={index} onClick={() => onClickMessageView(index)}>
          <Image image={typeToImage[message.type as string]} y={heightOffset} width={MESSAGE_WIDTH} height={MESSAGE_HEIGHT} />
          <Text text={message.name} fontSize={MESSAGE_TALK_FONT_SIZE} x={MESSAGE_NAME_X} y={heightOffset + MESSAGE_NAME_Y}
            fontFamily={MESSAGE_FONT_FAMILY} lineHeight={1.0} />
          <Text text={message.talk} fontSize={MESSAGE_TALK_FONT_SIZE} x={MESSAGE_TALK_X} y={heightOffset + MESSAGE_TALK_Y}
            fontFamily={MESSAGE_FONT_FAMILY} lineHeight={34.0 / 24} />
        </Layer>;
      })
    }
  </Stage>
};

export default MessageView;
