import React from 'react';
import { Tabs, Typography } from 'antd';

const { Title } = Typography;

const Account = () => {
  return (
    <div data-easytag="id1-src/pages/Account.jsx" className="space-y-6">
      <Title level={3} data-easytag="id2-src/pages/Account.jsx" className="!mb-2">Личный кабинет</Title>
      <Tabs
        data-easytag="id3-src/pages/Account.jsx"
        defaultActiveKey="profile"
        items={[
          {
            key: 'profile',
            label: 'Профиль',
            children: <div data-easytag="id4-src/pages/Account.jsx">Информация о профиле</div>,
          },
          {
            key: 'orders',
            label: 'Мои заказы',
            children: <div data-easytag="id5-src/pages/Account.jsx">Список заказов</div>,
          },
        ]}
      />
    </div>
  );
};

export default Account;
