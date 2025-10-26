import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import { createOrder } from '../api/orders';
import { createIntent, confirmPayment } from '../api/payments';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const created = await createOrder({
        delivery: { method: values.deliveryMethod, address: values.address },
        payment: { method: values.paymentMethod },
      });
      const orderId = created?.order?._id;
      if (!orderId) {
        message.error('Не удалось создать заказ');
        setLoading(false);
        return;
      }
      if (Array.isArray(created?.notifications)) {
        created.notifications.forEach((n) => message.info(n.message));
      }
      const intent = await createIntent(orderId);
      const clientSecret = intent?.clientSecret;
      const conf = await confirmPayment(orderId, clientSecret);
      if (Array.isArray(conf?.notifications)) {
        conf.notifications.forEach((n) => message.success(n.message));
      }
      message.success('Заказ оплачен');
      navigate('/account');
    } catch (e) {
      message.error('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-easytag="id1-src/pages/Checkout.js">
      <Card title="Доставка и оплата" data-easytag="id2-src/pages/Checkout.js">
        <Form layout="vertical" form={form} onFinish={onFinish} data-easytag="id3-src/pages/Checkout.js">
          <Form.Item label="Способ доставки" name="deliveryMethod" rules={[{ required: true, message: 'Выберите способ доставки' }]} data-easytag="id4-src/pages/Checkout.js">
            <Select
              options={[
                { value: 'courier', label: 'Курьер' },
                { value: 'pickup', label: 'Самовывоз' },
              ]}
              data-easytag="id5-src/pages/Checkout.js"
            />
          </Form.Item>
          <Form.Item label="Адрес" name="address" rules={[{ required: true, message: 'Укажите адрес' }]} data-easytag="id6-src/pages/Checkout.js">
            <Input placeholder="Город, улица, дом" data-easytag="id7-src/pages/Checkout.js" />
          </Form.Item>
          <Form.Item label="Метод оплаты" name="paymentMethod" rules={[{ required: true, message: 'Выберите метод оплаты' }]} data-easytag="id8-src/pages/Checkout.js">
            <Select options={[{ value: 'card', label: 'Карта' }]} data-easytag="id9-src/pages/Checkout.js" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} data-easytag="id10-src/pages/Checkout.js">Подтвердить и оплатить</Button>
        </Form>
      </Card>
      <Card title="Итоги" data-easytag="id11-src/pages/Checkout.js">
        <div className="text-gray-600" data-easytag="id12-src/pages/Checkout.js">Сумма будет рассчитана на сервере. Проверьте содержимое корзины перед оформлением.</div>
      </Card>
    </section>
  );
}

export default Checkout;
