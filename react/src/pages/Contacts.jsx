import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Contacts = () => {
  return (
    <div data-easytag="id1-src/pages/Contacts.jsx" className="space-y-4">
      <Title level={3} data-easytag="id2-src/pages/Contacts.jsx" className="!mb-2">Контакты</Title>
      <Paragraph data-easytag="id3-src/pages/Contacts.jsx" className="!m-0 text-gray-600">Email: support@easyappz.dev</Paragraph>
      <Paragraph data-easytag="id4-src/pages/Contacts.jsx" className="!m-0 text-gray-600">Телефон: +7 (000) 000-00-00</Paragraph>
      <div data-easytag="id5-src/pages/Contacts.jsx" className="h-40 bg-gray-100 border rounded-lg flex items-center justify-center text-gray-400">Карта/изображение</div>
    </div>
  );
};

export default Contacts;
