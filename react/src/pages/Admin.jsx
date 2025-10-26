import React from 'react';
import { Layout, Menu, Typography } from 'antd';

const { Sider, Content } = Layout;
const { Title } = Typography;

const Admin = () => {
  return (
    <Layout data-easytag="id1-src/pages/Admin.jsx" className="min-h-[60vh] bg-white border rounded-lg">
      <Sider data-easytag="id2-src/pages/Admin.jsx" width={220} theme="light" className="border-r">
        <Menu
          data-easytag="id3-src/pages/Admin.jsx"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            { key: 'dashboard', label: 'Дэшборд' },
            { key: 'products', label: 'Товары' },
            { key: 'orders', label: 'Заказы' },
          ]}
        />
      </Sider>
      <Content data-easytag="id4-src/pages/Admin.jsx" className="p-6">
        <Title level={4} data-easytag="id5-src/pages/Admin.jsx" className="!mb-4">Админ‑панель</Title>
        <div data-easytag="id6-src/pages/Admin.jsx" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div data-easytag="id7-src/pages/Admin.jsx" className="h-24 border rounded-lg flex items-center justify-center text-gray-400">Виджет 1</div>
          <div data-easytag="id8-src/pages/Admin.jsx" className="h-24 border rounded-lg flex items-center justify-center text-gray-400">Виджет 2</div>
          <div data-easytag="id9-src/pages/Admin.jsx" className="h-24 border rounded-lg flex items-center justify-center text-gray-400">Виджет 3</div>
          <div data-easytag="id10-src/pages/Admin.jsx" className="h-24 border rounded-lg flex items-center justify-center text-gray-400">Виджет 4</div>
        </div>
      </Content>
    </Layout>
  );
};

export default Admin;
