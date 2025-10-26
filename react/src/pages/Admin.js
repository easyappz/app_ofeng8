import React, { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, Card, Statistic, Row, Col, List, Button, Modal, Form, Input, InputNumber, Select, Spin, Empty, message } from 'antd';
import { getDashboard } from '../api/admin';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { listOrders, updateOrderStatus } from '../api/orders';

function Admin() {
  const queryClient = useQueryClient();
  const dashboardQuery = useQuery({ queryKey: ['admin', 'dashboard'], queryFn: getDashboard });
  const [productModal, setProductModal] = useState({ open: false, record: null });
  const [form] = Form.useForm();

  const productsQuery = useQuery({ queryKey: ['admin', 'products'], queryFn: () => listProducts({ limit: 50, page: 1 }) });
  const ordersQuery = useQuery({ queryKey: ['admin', 'orders'], queryFn: () => listOrders({ all: '1' }) });

  const createMut = useMutation({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      setProductModal({ open: false, record: null });
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      setProductModal({ open: false, record: null });
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'products'] }),
  });

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    },
  });

  const dashboard = dashboardQuery.data || {};
  const productItems = productsQuery.data?.items || [];
  const orders = ordersQuery.data || [];

  const productModalTitle = useMemo(() => (productModal.record ? 'Редактировать товар' : 'Создать товар'), [productModal]);

  const openCreate = () => {
    form.resetFields();
    setProductModal({ open: true, record: null });
  };

  const openEdit = (rec) => {
    form.setFieldsValue({
      title: rec.title,
      description: rec.description,
      price: rec.price,
      stock: rec.stock,
      category: rec.category,
    });
    setProductModal({ open: true, record: rec });
  };

  const submitProduct = async () => {
    const values = await form.validateFields();
    try {
      if (productModal.record) {
        await updateMut.mutateAsync({ id: productModal.record._id, payload: values });
        message.success('Товар обновлён');
      } else {
        await createMut.mutateAsync(values);
        message.success('Товар создан');
      }
    } catch {
      message.error('Ошибка при сохранении товара');
    }
  };

  return (
    <section data-easytag="id1-src/pages/Admin.js">
      <Tabs
        data-easytag="id2-src/pages/Admin.js"
        items={[
          {
            key: 'dashboard',
            label: 'Дэшборд',
            children: (
              dashboardQuery.isLoading ? (
                <div className="flex items-center justify-center py-10" data-easytag="id3-src/pages/Admin.js"><Spin /></div>
              ) : (
                <Row gutter={[16, 16]} data-easytag="id4-src/pages/Admin.js">
                  <Col xs={24} md={12} lg={6} data-easytag="id5-src/pages/Admin.js"><Card data-easytag="id6-src/pages/Admin.js"><Statistic title="Пользователи" value={dashboard.usersCount || 0} /></Card></Col>
                  <Col xs={24} md={12} lg={6} data-easytag="id7-src/pages/Admin.js"><Card data-easytag="id8-src/pages/Admin.js"><Statistic title="Товары" value={dashboard.productsCount || 0} /></Card></Col>
                  <Col xs={24} md={12} lg={6} data-easytag="id9-src/pages/Admin.js"><Card data-easytag="id10-src/pages/Admin.js"><Statistic title="Заказы" value={dashboard.ordersCount || 0} /></Card></Col>
                  <Col xs={24} md={12} lg={6} data-easytag="id11-src/pages/Admin.js"><Card data-easytag="id12-src/pages/Admin.js"><Statistic title="Продажи" value={(dashboard.salesTotal || 0).toFixed ? (dashboard.salesTotal || 0).toFixed(2) : dashboard.salesTotal} /></Card></Col>
                </Row>
              )
            )
          },
          {
            key: 'products',
            label: 'Товары',
            children: (
              <Card extra={<Button type="primary" onClick={openCreate} data-easytag="id13-src/pages/Admin.js">Добавить</Button>} data-easytag="id14-src/pages/Admin.js">
                {productsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-10" data-easytag="id15-src/pages/Admin.js"><Spin /></div>
                ) : productItems.length === 0 ? (
                  <Empty description="Нет товаров" data-easytag="id16-src/pages/Admin.js" />
                ) : (
                  <List
                    dataSource={productItems}
                    data-easytag="id17-src/pages/Admin.js"
                    renderItem={(p) => (
                      <List.Item
                        actions={[
                          <Button key="edit" onClick={() => openEdit(p)} data-easytag="id18-src/pages/Admin.js">Редактировать</Button>,
                          <Button key="del" danger onClick={() => deleteMut.mutate(p._id)} data-easytag="id19-src/pages/Admin.js">Удалить</Button>
                        ]}
                      >
                        <List.Item.Meta title={p.title} description={`Цена: ${Number(p.price || 0).toFixed(2)} ₽ • Остаток: ${p.stock}`} />
                      </List.Item>
                    )}
                  />
                )}
                <Modal
                  open={productModal.open}
                  title={productModalTitle}
                  onCancel={() => setProductModal({ open: false, record: null })}
                  onOk={submitProduct}
                  okText="Сохранить"
                  confirmLoading={createMut.isLoading || updateMut.isLoading}
                  data-easytag="id20-src/pages/Admin.js"
                >
                  <Form form={form} layout="vertical" data-easytag="id21-src/pages/Admin.js">
                    <Form.Item label="Название" name="title" rules={[{ required: true, message: 'Введите название' }]} data-easytag="id22-src/pages/Admin.js">
                      <Input data-easytag="id23-src/pages/Admin.js" />
                    </Form.Item>
                    <Form.Item label="Описание" name="description" data-easytag="id24-src/pages/Admin.js">
                      <Input.TextArea rows={3} data-easytag="id25-src/pages/Admin.js" />
                    </Form.Item>
                    <Form.Item label="Цена" name="price" rules={[{ required: true, message: 'Укажите цену' }]} data-easytag="id26-src/pages/Admin.js">
                      <InputNumber min={0} style={{ width: '100%' }} data-easytag="id27-src/pages/Admin.js" />
                    </Form.Item>
                    <Form.Item label="Остаток" name="stock" rules={[{ required: true, message: 'Укажите остаток' }]} data-easytag="id28-src/pages/Admin.js">
                      <InputNumber min={0} style={{ width: '100%' }} data-easytag="id29-src/pages/Admin.js" />
                    </Form.Item>
                    <Form.Item label="Категория" name="category" data-easytag="id30-src/pages/Admin.js">
                      <Input data-easytag="id31-src/pages/Admin.js" />
                    </Form.Item>
                  </Form>
                </Modal>
              </Card>
            )
          },
          {
            key: 'orders',
            label: 'Заказы',
            children: (
              ordersQuery.isLoading ? (
                <div className="flex items-center justify-center py-10" data-easytag="id32-src/pages/Admin.js"><Spin /></div>
              ) : !orders || orders.length === 0 ? (
                <Empty description="Заказов нет" data-easytag="id33-src/pages/Admin.js" />
              ) : (
                <List
                  dataSource={orders}
                  data-easytag="id34-src/pages/Admin.js"
                  renderItem={(o) => (
                    <List.Item
                      actions={[
                        <Select
                          key="status"
                          style={{ width: 180 }}
                          value={o.status}
                          onChange={(v) => statusMut.mutate({ id: o._id, status: v })}
                          options={[
                            { value: 'created', label: 'created' },
                            { value: 'paid', label: 'paid' },
                            { value: 'shipped', label: 'shipped' },
                            { value: 'completed', label: 'completed' },
                            { value: 'cancelled', label: 'cancelled' },
                          ]}
                          data-easytag="id35-src/pages/Admin.js"
                        />
                      ]}
                    >
                      <List.Item.Meta title={`Заказ #${o._id}`} description={`Пользователь: ${o.user?.email || '-'} • Сумма: ${Number(o.total || 0).toFixed(2)} ₽`} />
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

export default Admin;
