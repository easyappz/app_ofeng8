import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout data-easytag="id1-src/layout/MainLayout.jsx" className="min-h-screen bg-white">
      <AppHeader />
      <Content data-easytag="id2-src/layout/MainLayout.jsx" className="">
        <main data-easytag="id3-src/layout/MainLayout.jsx" className="container py-6">
          <div data-easytag="id4-src/layout/MainLayout.jsx" className="min-h-[60vh]">{children}</div>
        </main>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
