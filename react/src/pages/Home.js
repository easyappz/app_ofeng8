import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="bg-white rounded-xl p-8 md:p-12 shadow-sm" data-easytag="id1-src/pages/Home.js">
      <h1 className="text-3xl md:text-4xl font-bold mb-4" data-easytag="id2-src/pages/Home.js">Добро пожаловать в Easyappz Shop</h1>
      <p className="text-gray-600 mb-6" data-easytag="id3-src/pages/Home.js">Выберите лучшие товары по отличным ценам. Удобный поиск, отзывы и быстрый заказ.</p>
      <div data-easytag="id4-src/pages/Home.js">
        <Link to="/catalog" data-easytag="id5-src/pages/Home.js">
          <Button type="primary" size="large" data-easytag="id6-src/pages/Home.js">Перейти в каталог</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
