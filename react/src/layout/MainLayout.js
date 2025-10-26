import React, { useMemo, useState } from 'react';
import { Layout, Menu, Badge, Button, Space, Typography, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuth, logout } = useAuth();
  const { cartCount } = useCart();
  const [authOpen, setAuthOpen] = useState(false);

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith('/catalog')) return ['catalog'];
    if (location.pathname.startsWith('/cart')) return ['cart'];
    if (location.pathname.startsWith('/account')) return ['account'];
    if (location.pathname.startsWith('/about')) return ['about'];
    if (location.pathname.startsWith('/contacts')) return ['contacts'];
    if (location.pathname.startsWith('/admin')) return ['admin'];
    return ['home'];
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    message.success('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <Layout className="min-h-screen" data-easytag="id1-src/layout/MainLayout.js">
      <Header className="bg-white shadow-sm sticky top-0 z-50" data-easytag="id2-src/layout/MainLayout.js">
        <div className="flex items-center justify-between" data-easytag="id3-src/layout/MainLayout.js">
          <div className="flex items-center gap-6" data-easytag="id4-src/layout/MainLayout.js">
            <Link to="/" className="text-xl font-semibold" data-easytag="id5-src/layout/MainLayout.js">Easyappz Shop</Link>
            <nav data-easytag="id6-src/layout/MainLayout.js">
              <Menu
                data-easytag="id7-src/layout/MainLayout.js"
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={[
                  { key: 'home', label: <Link to="/" data-easytag="id8-src/layout/MainLayout.js">Главная</Link> },
                  { key: 'catalog', label: <Link to="/catalog" data-easytag="id9-src/layout/MainLayout.js">Каталог</Link> },
                  { key: 'about', label: <Link to="/about" data-easytag="id10-src/layout/MainLayout.js">О нас</Link> },
                  { key: 'contacts', label: <Link to="/contacts" data-easytag="id11-src/layout/MainLayout.js">Контакты</Link> },
                  { key: 'admin', label: <Link to="/admin" data-easytag="id12-src/layout/MainLayout.js">Админ</Link> },
                ]}
              />
            </nav>
          </div>
          <div className="flex items-center gap-3" data-easytag="id13-src/layout/MainLayout.js">
            <Link to="/cart" data-easytag="id14-src/layout/MainLayout.js">
              <Badge count={isAuth ? cartCount : 0} size="small" className="mr-2">
                <Button icon={<ShoppingCartOutlined />} type="text" data-easytag="id15-src/layout/MainLayout.js">Корзина</Button>
              </Badge>
            </Link>
            {isAuth ? (
              <Space data-easytag="id16-src/layout/MainLayout.js">
                <Text className="hidden sm:block" data-easytag="id17-src/layout/MainLayout.js">{user?.name || 'Профиль'}</Text>
                <Link to="/account" data-easytag="id18-src/layout/MainLayout.js">
                  <Button icon={<UserOutlined />} data-easytag="id19-src/layout/MainLayout.js">ЛК</Button>
                </Link>
                <Button icon={<LogoutOutlined />} onClick={handleLogout} data-easytag="id20-src/layout/MainLayout.js">Выйти</Button>
              </Space>
            ) : (
              <Button icon={<LoginOutlined />} onClick={() => setAuthOpen(true)} data-easytag="id21-src/layout/MainLayout.js">Войти</Button>
            )}
          </div>
        </div>
      </Header>
      <Content className="bg-gray-50" data-easytag="id22-src/layout/MainLayout.js">
        <div className="max-w-7xl mx-auto p-4 md:p-6" data-easytag="id23-src/layout/MainLayout.js">
          {children}
        </div>
      </Content>
      <Footer className="text-center" data-easytag="id24-src/layout/MainLayout.js">
        © {new Date().getFullYear()} Easyappz. Все права защищены.
      </Footer>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </Layout>
  );
}

export default MainLayout;
