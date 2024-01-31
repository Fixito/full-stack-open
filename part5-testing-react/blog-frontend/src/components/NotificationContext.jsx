import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const initiaState = {
  type: '',
  text: '',
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initiaState
  );
  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const useNotifcationDispatch = () => {
  const { notificationDispatch } = useContext(NotificationContext);
  return notificationDispatch;
};

export default NotificationContextProvider;
