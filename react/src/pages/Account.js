import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, Descriptions, List, Spin, Empty } from 'antd';
import { getMe } from '../api/auth';
import { listOrders } from '../api/orders';

function Account() {
  const meQuery = useQuery({ queryKey: ['me'], queryFn: getMe });
  const ordersQuery = useQuery({ queryKey: ['orders'], queryFn: () => listOrders() });

  if (meQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20" data-easytag="id1-src/pages/Account.js"><Spin /></div>
    );
  }

  const user = meQuery.data?.user || meQuery.data || {};

  return (
    <section className="bg-white rounded-lg p-4" data-easytag="id2-src/pages/Account.js">
      <Tabs
        data-easytag="id3-src/pages/Account.js"
        items={[
          {
            key: 'profile',
            label: 'Профиль',
            children: (
              <Descriptions bordered column={1} size="middle" data-easytag="id4-src/pages/Account.js">
                <Descriptions.Item label="Имя" data-easytag="id5-src/pages/Account.js">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Email" data-easytag="id6-src/pages/Account.js">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Роль" data-easytag="id7-src/pages/Account.js">{user.role}</Descriptions.Item>
              </Descriptions>
            )
          },
          {
            key: 'orders',
            label: 'Мои заказы',
            children: (
              ordersQuery.isLoading ? (
                <div className="flex items-center justify-center py-10" data-easytag="id8-src/pages/Account.js"><Spin /></div>
              ) : !ordersQuery.data || ordersQuery.data.length === 0 ? (
                <Empty description="Заказов пока нет" data-easytag="id9-src/pages/Account.js" />
              ) : (
                <List
                  dataSource={ordersQuery.data}
                  data-easytag="id10-src/pages/Account.js"
                  renderItem={(o) => (
                    <List.Item data-easytag="id11-src/pages/Account.js">
                      <List.Item.Meta title={`Заказ #${o._id}`} description={`Статус: ${o.status} • Сумма: ${Number(o.total || 0).toFixed(2)} ₽`} />
                    </List.Item>
                  )}
                />
              )
            )
          },
        ]}
      />
    </section>
  );
}

export default Account;
