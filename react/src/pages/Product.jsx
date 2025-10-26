import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Typography, Rate, Form, Input } from 'antd';

const { Title, Paragraph } = Typography;

const Product = () => {
  const { id } = useParams();

  return (
    <div data-easytag="id1-src/pages/Product.jsx" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section data-easytag="id2-src/pages/Product.jsx" className="bg-white border rounded-lg p-4 h-[360px] flex items-center justify-center text-gray-400">Здесь будет изображение товара</section>
      <section data-easytag="id3-src/pages/Product.jsx" className="space-y-4">
        <Title level={3} data-easytag="id4-src/pages/Product.jsx" className="!mb-2">Товар #{id}</Title>
        <Paragraph data-easytag="id5-src/pages/Product.jsx" className="!m-0 text-gray-600">Краткое описание товара. Подробный текст, характеристики и преимущества.</Paragraph>
        <div data-easytag="id6-src/pages/Product.jsx" className="flex items-center gap-3">
          <Rate defaultValue={4} data-easytag="id7-src/pages/Product.jsx" />
          <span data-easytag="id8-src/pages/Product.jsx" className="text-sm text-gray-500">(12 отзывов)</span>
        </div>
        <div data-easytag="id9-src/pages/Product.jsx" className="text-2xl font-semibold">2 990 ₽</div>
        <div data-easytag="id10-src/pages/Product.jsx">
          <Button type="primary" size="large">В корзину</Button>
        </div>
      </section>

      <section data-easytag="id11-src/pages/Product.jsx" className="lg:col-span-2 space-y-4">
        <Title level={4} data-easytag="id12-src/pages/Product.jsx" className="!mb-2">Отзывы</Title>
        <Card data-easytag="id13-src/pages/Product.jsx" className="">
          <div data-easytag="id14-src/pages/Product.jsx" className="space-y-2">
            <div data-easytag="id15-src/pages/Product.jsx" className="text-gray-500">Пока нет отзывов</div>
          </div>
        </Card>
        <Card data-easytag="id16-src/pages/Product.jsx" className="">
          <Title level={5} data-easytag="id17-src/pages/Product.jsx" className="!mb-3">Оставить отзыв</Title>
          <Form layout="vertical" data-easytag="id18-src/pages/Product.jsx">
            <Form.Item label="Оценка" data-easytag="id19-src/pages/Product.jsx">
              <Rate defaultValue={0} data-easytag="id20-src/pages/Product.jsx" />
            </Form.Item>
            <Form.Item label="Комментарий" data-easytag="id21-src/pages/Product.jsx">
              <Input.TextArea rows={4} placeholder="Ваш комментарий" data-easytag="id22-src/pages/Product.jsx" />
            </Form.Item>
            <Button type="primary" data-easytag="id23-src/pages/Product.jsx">Отправить</Button>
          </Form>
        </Card>
      </section>
    </div>
  );
};

export default Product;
