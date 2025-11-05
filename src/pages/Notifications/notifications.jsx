import React, { useState } from "react";
import styles from "./notifications.module.css";
import MainLayout from "../../layout/MainLayout";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { user: "익명의 누군가", time: "10월 29일 오전 11:35", read: true },
    { user: "김규림님", time: "10월 29일 오전 11:35", read: false },
    { user: "김태현님", time: "10월 29일 오전 11:35", read: false },
    { user: "오금서님", time: "10월 29일 오전 11:35", read: true },
    { user: "익명의 누군가", time: "10월 29일 오전 11:35", read: false },
  ]);
  
  const handleRead = (index) => {
    const newNotifications = [...notifications];
    newNotifications[index].read = true;
    setNotifications(newNotifications);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  

  return (
    <MainLayout>
    <div className={styles.pageWrapper}>
      
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.notificationTitle}>알림</p>
            <button className={styles.markAllRead} onClick={markAllRead}>
              모두 읽음
            </button>
          </div>
          <div className={styles.notifications}>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`${styles.notificationItem} ${!notification.read ? styles.unread : ""}`}
                onClick={() => handleRead(index)}
              >

                <span className={styles.heart}>❤️</span>
                <span className={styles.message}>
                  {notification.user}이(가) 당신의 포스트잇을 좋아합니다
                </span>
                <span className={styles.time}>{notification.time}</span>
                {!notification.read && <span className={styles.dot}></span>}
              </div>
            ))}
          </div>
        </div>
      
    </div>
    </MainLayout>
  );
};

export default Notification;

