import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProduct } from '../api/products';
import { getReviews, addReview } from '../api/reviews';
import { Card, Rate, Spin, Empty, Form, Input, Button, message } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

function Product() {
  const { id } = useParams();
  const { isAuth } = useAuth();
  const { addMutation } = useCart();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const productQuery = useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id) });
  const reviewsQuery = useQuery({ queryKey: ['product', id, 'reviews'], queryFn: () => getReviews(id) });

  const addReviewMutation = useMutation({
    mutationFn: (payload) => addReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });

  const handleAddToCart = async () => {
    if (!isAuth) {
      message.info('Войдите, чтобы добавить в корзину');
      return;
    }
    try {
      await addMutation.mutateAsync({ productId: id, qty: 1 });
      message.success('Добавлено в корзину');
    } catch {
      message.error('Не удалось добавить');
    }
  };

  const submitReview = async (values) => {
    if (!isAuth) {
      message.info('Необходимо войти');
      return;
    }
    setSubmitting(true);
    try {
      await addReviewMutation.mutateAsync(values);
      form.resetFields();
      message.success('Отзыв добавлен');
    } catch {
      message.error('Не удалось добавить отзыв');
    } finally {
      setSubmitting(false);
    }
  };

  if (productQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20" data-easytag="id1-src/pages/Product.js"><Spin /></div>
    );
  }

  const product = productQuery.data || {};
  const reviews = reviewsQuery.data || [];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-easytag="id2-src/pages/Product.js">
      <div className="bg-white rounded-lg p-4 lg:col-span-2" data-easytag="id3-src/pages/Product.js">
        <div className="h-64 bg-gray-100 rounded mb-4" data-easytag="id4-src/pages/Product.js" />
        <h1 className="text-2xl font-semibold mb-2" data-easytag="id5-src/pages/Product.js">{product.title}</h1>
        <div className="flex items-center gap-2 mb-3" data-easytag="id6-src/pages/Product.js">
          <Rate disabled allowHalf defaultValue={Number(product.rating || 0)} />
          <span data-easytag="id7-src/pages/Product.js">{Number(product.rating || 0).toFixed(1)}</span>
        </div>
        <p className="text-gray-700" data-easytag="id8-src/pages/Product.js">{product.description}</p>
      </div>
      <div className="lg:col-span-1" data-easytag="id9-src/pages/Product.js">
        <Card data-easytag="id10-src/pages/Product.js">
          <div className="text-2xl font-bold mb-3" data-easytag="id11-src/pages/Product.js">{Number(product.price || 0).toFixed(2)} ₽</div>
          <Button type="primary" block onClick={handleAddToCart} data-easytag="id12-src/pages/Product.js">В корзину</Button>
        </Card>
        <Card title="Отзывы" className="mt-4" data-easytag="id13-src/pages/Product.js">
          {reviewsQuery.isLoading ? (
            <div className="flex items-center justify-center py-6" data-easytag="id14-src/pages/Product.js"><Spin /></div>
          ) : reviews.length === 0 ? (
            <Empty description="Пока нет отзывов" data-easytag="id15-src/pages/Product.js" />
          ) : (
            <div className="space-y-3" data-easytag="id16-src/pages/Product.js">
              {reviews.map((r) => (
                <div key={r._id} className="border rounded p-3" data-easytag="id17-src/pages/Product.js">
                  <div className="flex items-center justify-between" data-easytag="id18-src/pages/Product.js">
                    <div className="font-medium" data-easytag="id19-src/pages/Product.js">{r.user?.name || 'Аноним'}</div>
                    <Rate disabled defaultValue={Number(r.rating || 0)} data-easytag="id20-src/pages/Product.js" />
                  </div>
                  <p className="text-gray-700 mt-2" data-easytag="id21-src/pages/Product.js">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4" data-easytag="id22-src/pages/Product.js">
            <Form form={form} layout="vertical" onFinish={submitReview} data-easytag="id23-src/pages/Product.js">
              <Form.Item label="Оценка" name="rating" rules={[{ required: true, message: 'Выберите оценку' }]} data-easytag="id24-src/pages/Product.js">
                <Rate data-easytag="id25-src/pages/Product.js" />
              </Form.Item>
              <Form.Item label="Комментарий" name="comment" data-easytag="id26-src/pages/Product.js">
                <Input.TextArea rows={3} placeholder="Поделитесь впечатлениями" data-easytag="id27-src/pages/Product.js" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={submitting} data-easytag="id28-src/pages/Product.js">Оставить отзыв</Button>
            </Form>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default Product;
