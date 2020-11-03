import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

import MainView from 'component/MainView';
import { ApplicationContext, useStore } from 'service/store';

// メイン画面
const App: React.FC = () => {
  const store = useStore();

  return (
    <ApplicationContext.Provider value={store}>
      <MainView />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <Rect
            x={20}
            y={20}
            width={50}
            height={50}
            fill="green"
            shadowBlur={5}
            onClick={() => alert('OK!')}
          />
        </Layer>
      </Stage>
    </ApplicationContext.Provider>
  );
};

export default App;
