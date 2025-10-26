import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <div data-easytag="id1-src/pages/NotFound.jsx" className="text-center py-16">
      <Title data-easytag="id2-src/pages/NotFound.jsx" className="!mb-2">404</Title>
      <Paragraph data-easytag="id3-src/pages/NotFound.jsx" className="text-gray-600 !mb-6">Страница не найдена</Paragraph>
      <Link to="/" data-easytag="id4-src/pages/NotFound.jsx">
        <Button type="primary">На главную</Button>
      </Link>
    </div>
  );
};

export default NotFound;
