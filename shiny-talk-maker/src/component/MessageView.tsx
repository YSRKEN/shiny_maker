import React, { useContext } from 'react';
import { Message } from 'model/Message';
import { ApplicationContext } from 'service/store';
import { Layer, Stage, Text, Image } from 'react-konva';
import { MESSAGE_FONT_FAMILY, MESSAGE_HEIGHT, MESSAGE_MARGIN, MESSAGE_NAME_X, MESSAGE_NAME_Y, MESSAGE_TALK_X, MESSAGE_TALK_Y, MESSAGE_WIDTH } from 'constant';
import frame from 'asset/frame-idol.png';
import useImage from 'use-image';

// メッセージ一覧
const MessageView: React.FC<{ messageList: Message[], startIndex?: number }> = ({ messageList, startIndex = -1 }) => {
  const { dispatch } = useContext(ApplicationContext);
  
  const [frameImage] = useImage(frame);
  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${startIndex + index}` });

  // JavaScriptで、表示サイズを決定
  const width = Math.min(window.innerWidth, MESSAGE_WIDTH);
  const scale = 1.0 * width / MESSAGE_WIDTH;

  const nameFontSize = 30 * scale;
  const talkFontSize = 24 * scale;

  return <Stage width={width} height={(MESSAGE_HEIGHT * messageList.length + MESSAGE_MARGIN * (messageList.length - 1)) * scale}>
    {
      messageList.map((message, index) => {
        const heightOffset = (MESSAGE_HEIGHT + MESSAGE_MARGIN) * index;
        return <Layer key={index} onClick={() => onClickMessageView(index)}>
          <Image image={frameImage} y={heightOffset * scale} width={width} height={MESSAGE_HEIGHT * scale} />
          <Text text={message.name} fontSize={nameFontSize} x={MESSAGE_NAME_X * scale} y={(heightOffset + MESSAGE_NAME_Y) * scale}
            fontFamily={MESSAGE_FONT_FAMILY} lineHeight={1.0} />
          <Text text={message.talk} fontSize={talkFontSize} x={MESSAGE_TALK_X * scale} y={(heightOffset + MESSAGE_TALK_Y) * scale}
            fontFamily={MESSAGE_FONT_FAMILY} lineHeight={34.0 / 24} />
        </Layer>;
      })
    }
  </Stage>
};

export default MessageView;
