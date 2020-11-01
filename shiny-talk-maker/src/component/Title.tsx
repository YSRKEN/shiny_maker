import React from 'react';

// タイトル表示(レスポンシブ対応済み)
const Title: React.FC = () => {
  return <>
    <h1 className="d-none d-sm-inline">シャニマス会話メーカー</h1>
    <h3 className="d-inline d-sm-none">シャニマス会話メーカー</h3>
  </>;
};

export default Title;
