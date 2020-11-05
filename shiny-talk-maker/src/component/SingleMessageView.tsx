import React from "react";
import { Layer, Text, Image } from 'react-konva';

import { MESSAGE_WIDTH, MESSAGE_HEIGHT, MESSAGE_TALK_FONT_SIZE, MESSAGE_NAME_X, MESSAGE_NAME_Y, MESSAGE_FONT_FAMILY, MESSAGE_TALK_X, MESSAGE_TALK_Y } from "constant";
import { Message } from "model/Message";

const SingleMessageView: React.FC<{
  message: Message,
  widthOffset: number,
  heightOffset: number,
  imageData: HTMLImageElement | undefined,
  onClick: () => void,
}> = ({message, widthOffset, heightOffset, imageData, onClick}) => {
  return <Layer onClick={onClick} onTap={onClick}>
  <Image image={imageData} x={widthOffset} y={heightOffset} width={MESSAGE_WIDTH} height={MESSAGE_HEIGHT} />
  <Text text={message.name} fontSize={MESSAGE_TALK_FONT_SIZE} x={widthOffset + MESSAGE_NAME_X} y={heightOffset + MESSAGE_NAME_Y}
    fontFamily={MESSAGE_FONT_FAMILY} lineHeight={1.0} />
  <Text text={message.talk} fontSize={MESSAGE_TALK_FONT_SIZE} x={widthOffset + MESSAGE_TALK_X} y={heightOffset + MESSAGE_TALK_Y}
    fontFamily={MESSAGE_FONT_FAMILY} lineHeight={34.0 / 24} />
</Layer>;
}

export default SingleMessageView;
