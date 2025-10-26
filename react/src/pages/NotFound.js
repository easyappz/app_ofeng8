import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="bg-white rounded-lg p-6" data-easytag="id1-src/pages/NotFound.js">
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={<Link to="/" data-easytag="id2-src/pages/NotFound.js"><Button type="primary" data-easytag="id3-src/pages/NotFound.js">На главную</Button></Link>}
      />
    </div>
  );
}

export default NotFound;
