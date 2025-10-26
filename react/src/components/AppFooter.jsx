import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer data-easytag="id1-src/components/AppFooter.jsx" className="bg-gray-50">
      <div data-easytag="id2-src/components/AppFooter.jsx" className="container text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
        <p data-easytag="id3-src/components/AppFooter.jsx" className="m-0">© {new Date().getFullYear()} Easyappz. Все права защищены.</p>
        <p data-easytag="id4-src/components/AppFooter.jsx" className="m-0">Сделано с ❤️ на React и Node.js</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
