import React, { useContext } from 'react';
import { Message } from 'model/Message';
import { ApplicationContext } from 'service/store';
import { Layer, Stage, Text } from 'react-konva';

// メッセージ一覧
const MessageView: React.FC<{ messageList: Message[], startIndex?: number }> = ({ messageList, startIndex = -1 }) => {
  const { dispatch } = useContext(ApplicationContext);

  const onClickMessageView = (index: number) => dispatch({ type: 'setSplitIndex', message: `${startIndex + index}` });

  // JavaScriptで、表示サイズを決定
  const width = Math.min(window.innerWidth, 850);
  const height = 170 * width / 850;
  const allHeight = height * messageList.length;
  const nameFontSize = 30 * width / 850;
  const talkFontSize = 24 * width / 850;

  return <Stage className="border" width={width} height={allHeight}>
    {
      messageList.map((message, index) =>
        <Layer key={index}>
          <Text text={message.name} fontSize={nameFontSize} y={height * index} fontFamily="'Kosugi Maru', sans-serif" />
          <Text text={message.talk} fontSize={talkFontSize} y={height * index + nameFontSize} fontFamily="'Kosugi Maru', sans-serif" />
        </Layer>)
    }
  </Stage>
};

export default MessageView;
