import React, { useContext } from 'react';
import { Message } from 'model/Message';
import { ApplicationContext } from 'service/store';
import { Layer, Stage, Text } from 'react-konva';
import { MESSAGE_FONT_FAMILY, MESSAGE_HEIGHT, MESSAGE_NAME_X, MESSAGE_NAME_Y, MESSAGE_TALK_X, MESSAGE_TALK_Y, MESSAGE_WIDTH } from 'constant';

// メッセージ一覧
const MessageView: React.FC<{ messageList: Message[], startIndex?: number }> = ({ messageList, startIndex = -1 }) => {
  const { dispatch } = useContext(ApplicationContext);

  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${startIndex + index}` });

  // JavaScriptで、表示サイズを決定
  const width = Math.min(window.innerWidth, MESSAGE_WIDTH);
  const scale = 1.0 * width / MESSAGE_WIDTH;

  const nameFontSize = 30 * scale;
  const talkFontSize = 24 * scale;

  return <Stage className="border" width={width} height={MESSAGE_HEIGHT * messageList.length * scale}>
    {
      messageList.map((message, index) => {
        const heightOffset = MESSAGE_HEIGHT * index;
        return <Layer key={index} onClick={() => onClickMessageView(index)}>
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
