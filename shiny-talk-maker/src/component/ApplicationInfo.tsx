import React from 'react';

// アプリ情報表示
const ApplicationInfo: React.FC = () => {
  return <>
    <span className="d-inline-block mr-3">Ver.2.0.0</span>
    <span className="d-inline-block mr-3"><a href="https://github.com/YSRKEN/shiny_maker" rel="noreferrer" target="_blank">GitHub</a> </span>
    <span><a href="https://twitter.com/YSRKEN" rel="noreferrer" target="_blank">作者のTwitter</a></span>
  </>
};

export default ApplicationInfo;
