import React from 'react';

import MainView from 'component/MainView';
import { ApplicationContext, useStore } from 'setvice/store';

// メイン画面
const App: React.FC = () => {
  const store = useStore();

  return (
    <ApplicationContext.Provider value={store}>
    <MainView />
    </ApplicationContext.Provider>
  );
};

export default App;
