import { createContext, useContext, useReducer } from 'react';

const NotficationContext = createContext();

const initialState = '';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );
  return (
    <NotficationContext.Provider value={{ notification, notificationDispatch }}>
      {children}
    </NotficationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotficationContext);
  return notificationAndDispatch.notification;
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotficationContext);
  return notificationAndDispatch.notificationDispatch;
};
