import { useEffect } from 'react';
import {
  useNotificationValue,
  useNotifcationDispatch,
} from './NotificationContext.jsx';

const Notification = () => {
  const { type, text } = useNotificationValue();
  const notificationDispatch = useNotifcationDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: '', text: '' },
      });
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  });

  return <div className={`notification ${type}`}>{text}</div>;
};

export default Notification;
