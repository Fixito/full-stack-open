import { useEffect } from 'react';
import {
  useNotificationDispatch,
  useNotificationValue,
} from '../NotificationContext.jsx';

const Notification = () => {
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    if (!notification) return;
    const id = setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: '' });
    }, 5000);

    return () => {
      clearTimeout(id);
    };
  });

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
