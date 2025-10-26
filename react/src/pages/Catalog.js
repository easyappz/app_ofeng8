import React, { useMemo, useState } from 'react';
import { Card, Input, InputNumber, Select, Switch, Button, Pagination, Row, Col, Rate, Spin, Empty, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../api/products';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Catalog() {
  const [params, setParams] = useState({ page: 1, limit: 12, q: '', priceMin: undefined, priceMax: undefined, ratingMin: undefined, inStock: undefined, sort: undefined });
  const { isAuth } = useAuth();
  const { addMutation } = useCart();

  const query = useQuery({
    queryKey: ['products', params],
    queryFn: () => listProducts(params),
    keepPreviousData: true,
  });

  const items = query.data?.items || [];
  const total = query.data?.total || 0;
  const page = query.data?.page || params.page;

  const handleSearch = () => {
    setParams((p) => ({ ...p, page: 1 }));
  };

  const handleAdd = async (productId) => {
    if (!isAuth) {
      message.info('Войдите, чтобы добавить в корзину');
      return;
    }
    try {
      await addMutation.mutateAsync({ productId, qty: 1 });
      message.success('Товар добавлен в корзину');
    } catch {
      message.error('Не удалось добавить товар');
    }
  };

  const filterBlock = useMemo(() => (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4" data-easytag="id1-src/pages/Catalog.js">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-easytag="id2-src/pages/Catalog.js">
        <div data-easytag="id3-src/pages/Catalog.js">
          <label className="block text-sm text-gray-600 mb-1" data-easytag="id4-src/pages/Catalog.js">Поиск (точный)</label>
          <Input value={params.q} onChange={(e) => setParams((p) => ({ ...p, q: e.target.value }))} placeholder="Название или описание" data-easytag="id5-src/pages/Catalog.js" />
        </div>
        <div className="flex gap-2" data-easytag="id6-src/pages/Catalog.js">
          <div className="flex-1" data-easytag="id7-src/pages/Catalog.js">
            <label className="block text-sm text-gray-600 mb-1" data-easytag="id8-src/pages/Catalog.js">Цена от</label>
            <InputNumber min={0} style={{ width: '100%' }} value={params.priceMin} onChange={(v) => setParams((p) => ({ ...p, priceMin: v }))} data-easytag="id9-src/pages/Catalog.js" />
          </div>
          <div className="flex-1" data-easytag="id10-src/pages/Catalog.js">
            <label className="block text-sm text-gray-600 mb-1" data-easytag="id11-src/pages/Catalog.js">до</label>
            <InputNumber min={0} style={{ width: '100%' }} value={params.priceMax} onChange={(v) => setParams((p) => ({ ...p, priceMax: v }))} data-easytag="id12-src/pages/Catalog.js" />
          </div>
        </div>
        <div className="flex items-end gap-2" data-easytag="id13-src/pages/Catalog.js">
          <div className="flex-1" data-easytag="id14-src/pages/Catalog.js">
            <label className="block text-sm text-gray-600 mb-1" data-easytag="id15-src/pages/Catalog.js">Минимальный рейтинг</label>
            <InputNumber min={1} max={5} style={{ width: '100%' }} value={params.ratingMin} onChange={(v) => setParams((p) => ({ ...p, ratingMin: v }))} data-easytag="id16-src/pages/Catalog.js" />
          </div>
          <div className="flex items-center gap-2" data-easytag="id17-src/pages/Catalog.js">
            <span className="text-sm text-gray-600" data-easytag="id18-src/pages/Catalog.js">В наличии</span>
            <Switch checked={params.inStock === '1'} onChange={(c) => setParams((p) => ({ ...p, inStock: c ? '1' : undefined }))} data-easytag="id19-src/pages/Catalog.js" />
          </div>
        </div>
        <div className="md:col-span-3 flex items-center justify-between" data-easytag="id20-src/pages/Catalog.js">
          <div className="flex items-center gap-2" data-easytag="id21-src/pages/Catalog.js">
            <span className="text-sm text-gray-600" data-easytag="id22-src/pages/Catalog.js">Сортировать</span>
            <Select
              placeholder="Выберите"
              allowClear
              style={{ width: 220 }}
              value={params.sort}
              onChange={(v) => setParams((p) => ({ ...p, sort: v }))}
              options={[{ value: 'new', label: 'Новинки' }, { value: 'price_asc', label: 'Цена по возрастанию' }, { value: 'price_desc', label: 'Цена по убыванию' }]}
              data-easytag="id23-src/pages/Catalog.js"
            />
          </div>
          <Button type="primary" onClick={handleSearch} data-easytag="id24-src/pages/Catalog.js">Найти</Button>
        </div>
      </div>
    </div>
  ), [params]);

  return (
    <section data-easytag="id25-src/pages/Catalog.js">
      {filterBlock}
      {query.isLoading ? (
        <div className="flex items-center justify-center py-20" data-easytag="id26-src/pages/Catalog.js"><Spin /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-lg p-8" data-easytag="id27-src/pages/Catalog.js"><Empty description="Товары не найдены" /></div>
      ) : (
        <div data-easytag="id28-src/pages/Catalog.js">
          <Row gutter={[16, 16]} data-easytag="id29-src/pages/Catalog.js">
            {items.map((p) => (
              <Col key={p._id} xs={24} sm={12} md={8} lg={6} data-easytag="id30-src/pages/Catalog.js">
                <Card
                  data-easytag="id31-src/pages/Catalog.js"
                  title={<div className="truncate" data-easytag="id32-src/pages/Catalog.js">{p.title}</div>}
                  actions={[
                    <Button key="add" type="link" onClick={() => handleAdd(p._id)} data-easytag="id33-src/pages/Catalog.js">В корзину</Button>,
                    <Link key="more" to={`/product/${p._id}`} data-easytag="id34-src/pages/Catalog.js">Подробнее</Link>,
                  ]}
                >
                  <div className="h-28 bg-gray-100 rounded mb-3" data-easytag="id35-src/pages/Catalog.js" />
                  <div className="flex items-center justify-between" data-easytag="id36-src/pages/Catalog.js">
                    <span className="text-lg font-semibold" data-easytag="id37-src/pages/Catalog.js">{Number(p.price).toFixed(2)} ₽</span>
                    <div className="flex items-center gap-1" data-easytag="id38-src/pages/Catalog.js">
                      <Rate disabled allowHalf defaultValue={Number(p.rating || 0)} />
                      <span data-easytag="id39-src/pages/Catalog.js">{Number(p.rating || 0).toFixed(1)}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="flex justify-center mt-6" data-easytag="id40-src/pages/Catalog.js">
            <Pagination current={page} total={total} pageSize={params.limit} onChange={(pg) => setParams((p) => ({ ...p, page: pg }))} showSizeChanger={false} data-easytag="id41-src/pages/Catalog.js" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Catalog;
