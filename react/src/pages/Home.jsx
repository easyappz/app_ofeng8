import React from 'react';
import { Button, Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div data-easytag="id1-src/pages/Home.jsx" className="space-y-10">
      <section data-easytag="id2-src/pages/Home.jsx" className="bg-gradient-to-r from-brand-50 to-white rounded-xl p-8 md:p-12 border">
        <div data-easytag="id3-src/pages/Home.jsx" className="grid md:grid-cols-2 gap-8 items-center">
          <div data-easytag="id4-src/pages/Home.jsx" className="space-y-4">
            <Title level={2} data-easytag="id5-src/pages/Home.jsx" className="!m-0">Добро пожаловать в Easyappz Shop</Title>
            <Paragraph data-easytag="id6-src/pages/Home.jsx" className="!m-0 text-gray-600">Интернет‑магазин с современным интерфейсом. Исследуйте каталог, добавляйте товары в корзину и оформляйте заказ.</Paragraph>
            <div data-easytag="id7-src/pages/Home.jsx">
              <Link to="/catalog" data-easytag="id8-src/pages/Home.jsx">
                <Button type="primary" size="large">Перейти в каталог</Button>
              </Link>
            </div>
          </div>
          <div data-easytag="id9-src/pages/Home.jsx" className="h-48 md:h-64 bg-white/60 rounded-lg border border-dashed flex items-center justify-center text-gray-400">Здесь будет баннер</div>
        </div>
      </section>

      <section data-easytag="id10-src/pages/Home.jsx" className="space-y-6">
        <Title level={3} data-easytag="id11-src/pages/Home.jsx" className="!mb-2">Подборки товаров</Title>
        <Row gutter={[16, 16]} data-easytag="id12-src/pages/Home.jsx">
          {[1,2,3,4].map((i) => (
            <Col key={i} xs={24} sm={12} md={6} data-easytag={`id13-${i}-src/pages/Home.jsx`}>
              <Card data-easytag={`id14-${i}-src/pages/Home.jsx`} className="h-40 flex items-center justify-center text-gray-400" bordered>
                Плейсхолдер коллекции #{i}
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home;
