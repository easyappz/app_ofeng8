import React from 'react';
import { Layout, Menu, Input, Badge, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, AppstoreOutlined, InfoCircleOutlined, PhoneOutlined, DashboardOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();

  const selectedKeys = React.useMemo(() => {
    if (location.pathname === '/') return ['/'];
    if (location.pathname.startsWith('/catalog')) return ['/catalog'];
    if (location.pathname.startsWith('/about')) return ['/about'];
    if (location.pathname.startsWith('/contacts')) return ['/contacts'];
    if (location.pathname.startsWith('/admin')) return ['/admin'];
    return [];
  }, [location.pathname]);

  return (
    <Header data-easytag="id1-src/components/AppHeader.jsx" className="bg-white shadow-sm sticky top-0 z-50">
      <div data-easytag="id2-src/components/AppHeader.jsx" className="container flex items-center justify-between gap-4">
        <nav data-easytag="id3-src/components/AppHeader.jsx" className="flex-1 flex items-center gap-4">
          <Link to="/" data-easytag="id4-src/components/AppHeader.jsx" className="text-xl font-semibold text-brand-700 hover:text-brand-500 transition-colors">Easyappz Shop</Link>
          <Menu
            data-easytag="id5-src/components/AppHeader.jsx"
            mode="horizontal"
            selectedKeys={selectedKeys}
            className="flex-1 min-w-0 border-0"
            items={[
              { key: '/', label: <Link to="/" data-easytag="id6-src/components/AppHeader.jsx">Главная</Link>, icon: <AppstoreOutlined /> },
              { key: '/catalog', label: <Link to="/catalog" data-easytag="id7-src/components/AppHeader.jsx">Каталог</Link> },
              { key: '/about', label: <Link to="/about" data-easytag="id8-src/components/AppHeader.jsx">О нас</Link>, icon: <InfoCircleOutlined /> },
              { key: '/contacts', label: <Link to="/contacts" data-easytag="id9-src/components/AppHeader.jsx">Контакты</Link>, icon: <PhoneOutlined /> },
              { key: '/admin', label: <Link to="/admin" data-easytag="id10-src/components/AppHeader.jsx">Админ</Link>, icon: <DashboardOutlined /> },
            ]}
          />
        </nav>
        <div data-easytag="id11-src/components/AppHeader.jsx" className="flex items-center gap-3">
          <div data-easytag="id12-src/components/AppHeader.jsx" className="hidden md:block w-64">
            <Input.Search
              data-easytag="id13-src/components/AppHeader.jsx"
              placeholder="Поиск товаров"
              allowClear
              enterButton="Найти"
              onSearch={() => {}}
            />
          </div>
          <Space size="middle" data-easytag="id14-src/components/AppHeader.jsx">
            <Link to="/cart" data-easytag="id15-src/components/AppHeader.jsx" className="text-gray-700 hover:text-brand-600">
              <Badge count={0} size="small" offset={[0, 6]}>
                <ShoppingCartOutlined style={{ fontSize: 20 }} />
              </Badge>
            </Link>
            <Link to="/account" data-easytag="id16-src/components/AppHeader.jsx" className="text-gray-700 hover:text-brand-600">
              <UserOutlined style={{ fontSize: 20 }} />
            </Link>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
