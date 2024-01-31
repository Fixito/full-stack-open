import { useEffect } from "react";
import {
  useNotificationValue,
  useNotifcationDispatch,
} from "./NotificationContext.jsx";

const Notification = () => {
  const { type, text } = useNotificationValue();
  const notificationDispatch = useNotifcationDispatch();

  console.log(type);
  const typeToClass = {
    success: "alert-success",
    error: "alert-error",
  };

  const alertClass = typeToClass[type] || "bg-blue-500";

  useEffect(() => {
    const id = setTimeout(() => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "", text: "" },
      });
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div role="alert" className={`alert ${alertClass}`}>
      {text}
    </div>
  );
};

export default Notification;
