import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div data-easytag="id1-src/pages/About.jsx" className="space-y-4">
      <Title level={3} data-easytag="id2-src/pages/About.jsx" className="!mb-2">О нас</Title>
      <Paragraph data-easytag="id3-src/pages/About.jsx" className="!m-0 text-gray-600">Мы создаем современные приложения и интернет‑магазины на React и Node.js. Здесь будет информация о компании, миссии и ценностях.</Paragraph>
    </div>
  );
};

export default About;
