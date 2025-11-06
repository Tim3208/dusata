import React from 'react';
import MainLayOut from '@/layout/MainLayOut';

const NotificationPage = () => {
  return (
    <MainLayOut>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">알림</h1>
        <div className="space-y-4">
          <p className="text-gray-500">알림이 없습니다.</p>
        </div>
      </div>
    </MainLayOut>
  );
};

export default NotificationPage;
