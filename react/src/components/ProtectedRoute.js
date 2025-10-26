import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { isAuth, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-easytag="id1-src/components/ProtectedRoute.js">
        <Spin />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (role && user?.role !== role) {
    return (
      <div data-easytag="id2-src/components/ProtectedRoute.js">
        <Result status="403" title="403" subTitle="Недостаточно прав" />
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
