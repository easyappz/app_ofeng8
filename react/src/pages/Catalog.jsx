import React from 'react';
import { Card, Row, Col, Slider, Checkbox, Typography, Select, Input, Button } from 'antd';

const { Title } = Typography;

const Catalog = () => {
  return (
    <div data-easytag="id1-src/pages/Catalog.jsx" className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside data-easytag="id2-src/pages/Catalog.jsx" className="md:col-span-1 bg-white border rounded-lg p-4 space-y-6 h-fit">
        <div data-easytag="id3-src/pages/Catalog.jsx">
          <Title level={5} data-easytag="id4-src/pages/Catalog.jsx" className="!mb-3">Поиск</Title>
          <Input placeholder="Название или описание" data-easytag="id5-src/pages/Catalog.jsx" />
        </div>
        <div data-easytag="id6-src/pages/Catalog.jsx">
          <Title level={5} data-easytag="id7-src/pages/Catalog.jsx" className="!mb-3">Цена</Title>
          <Slider range defaultValue={[0, 100]} data-easytag="id8-src/pages/Catalog.jsx" />
        </div>
        <div data-easytag="id9-src/pages/Catalog.jsx">
          <Title level={5} data-easytag="id10-src/pages/Catalog.jsx" className="!mb-3">Рейтинг</Title>
          <Slider min={1} max={5} defaultValue={3} data-easytag="id11-src/pages/Catalog.jsx" />
        </div>
        <div data-easytag="id12-src/pages/Catalog.jsx">
          <Checkbox data-easytag="id13-src/pages/Catalog.jsx">В наличии</Checkbox>
        </div>
        <div data-easytag="id14-src/pages/Catalog.jsx">
          <Title level={5} data-easytag="id15-src/pages/Catalog.jsx" className="!mb-3">Сортировка</Title>
          <Select
            data-easytag="id16-src/pages/Catalog.jsx"
            className="w-full"
            defaultValue="new"
            options={[
              { value: 'new', label: 'Сначала новые' },
              { value: 'price_asc', label: 'По цене (возр.)' },
              { value: 'price_desc', label: 'По цене (убыв.)' },
            ]}
          />
        </div>
        <div data-easytag="id17-src/pages/Catalog.jsx" className="flex gap-2">
          <Button type="primary" data-easytag="id18-src/pages/Catalog.jsx">Применить</Button>
          <Button data-easytag="id19-src/pages/Catalog.jsx">Сбросить</Button>
        </div>
      </aside>

      <section data-easytag="id20-src/pages/Catalog.jsx" className="md:col-span-3">
        <Row gutter={[16, 16]} data-easytag="id21-src/pages/Catalog.jsx">
          {[1,2,3,4,5,6,7,8,9].map((i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6} data-easytag={`id22-${i}-src/pages/Catalog.jsx`}>
              <Card
                data-easytag={`id23-${i}-src/pages/Catalog.jsx`}
                hoverable
                className="h-56 flex flex-col"
                cover={<div data-easytag={`id24-${i}-src/pages/Catalog.jsx`} className="h-28 bg-gray-100 border-b border-dashed flex items-center justify-center text-gray-400">Изображение</div>}
              >
                <div data-easytag={`id25-${i}-src/pages/Catalog.jsx`} className="flex-1">Название товара</div>
                <div data-easytag={`id26-${i}-src/pages/Catalog.jsx`} className="font-semibold">1 990 ₽</div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Catalog;
