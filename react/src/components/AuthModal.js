import React, { useEffect } from 'react';
import { Modal, Tabs, Form, Input, Button, message } from 'antd';
import { useAuth } from '../hooks/useAuth';

function AuthModal({ open, onClose }) {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const { loginMutation, registerMutation, isAuth } = useAuth();

  useEffect(() => {
    if (isAuth && open) {
      onClose();
    }
  }, [isAuth, open, onClose]);

  const handleLogin = async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      message.success('Добро пожаловать!');
      onClose();
    } catch (e) {
      message.error('Не удалось войти');
    }
  };

  const handleRegister = async (values) => {
    try {
      await registerMutation.mutateAsync(values);
      message.success('Регистрация успешна!');
      onClose();
    } catch (e) {
      message.error('Не удалось зарегистрироваться');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Вход и регистрация" data-easytag="id1-src/components/AuthModal.js">
      <div data-easytag="id2-src/components/AuthModal.js">
        <Tabs
          data-easytag="id3-src/components/AuthModal.js"
          items={[
            {
              key: 'login',
              label: 'Вход',
              children: (
                <Form form={loginForm} layout="vertical" onFinish={handleLogin} data-easytag="id4-src/components/AuthModal.js">
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }]} data-easytag="id5-src/components/AuthModal.js">
                    <Input placeholder="example@mail.com" data-easytag="id6-src/components/AuthModal.js" />
                  </Form.Item>
                  <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]} data-easytag="id7-src/components/AuthModal.js">
                    <Input.Password placeholder="••••••••" data-easytag="id8-src/components/AuthModal.js" />
                  </Form.Item>
                  <Form.Item data-easytag="id9-src/components/AuthModal.js">
                    <Button type="primary" htmlType="submit" block loading={loginMutation.isLoading} data-easytag="id10-src/components/AuthModal.js">Войти</Button>
                  </Form.Item>
                </Form>
              )
            },
            {
              key: 'register',
              label: 'Регистрация',
              children: (
                <Form form={registerForm} layout="vertical" onFinish={handleRegister} data-easytag="id11-src/components/AuthModal.js">
                  <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите имя' }]} data-easytag="id12-src/components/AuthModal.js">
                    <Input placeholder="Иван" data-easytag="id13-src/components/AuthModal.js" />
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }]} data-easytag="id14-src/components/AuthModal.js">
                    <Input placeholder="example@mail.com" data-easytag="id15-src/components/AuthModal.js" />
                  </Form.Item>
                  <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]} data-easytag="id16-src/components/AuthModal.js">
                    <Input.Password placeholder="Минимум 6 символов" data-easytag="id17-src/components/AuthModal.js" />
                  </Form.Item>
                  <Form.Item data-easytag="id18-src/components/AuthModal.js">
                    <Button type="primary" htmlType="submit" block loading={registerMutation.isLoading} data-easytag="id19-src/components/AuthModal.js">Зарегистрироваться</Button>
                  </Form.Item>
                </Form>
              )
            },
          ]}
        />
      </div>
    </Modal>
  );
}

export default AuthModal;
