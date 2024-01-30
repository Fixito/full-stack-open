import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Notification from "../components/Notification.jsx";
import { useNotificationValue } from "../components/NotificationContext.jsx";
import { useUserValue } from "../components/UserContext.jsx";

const SharedLayout = () => {
  const user = useUserValue();
  const notification = useNotificationValue();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-6xl">
        {notification.text && <Notification />}
      </div>
      {isPageLoading ? (
        <div className="loading loading-spinner" />
      ) : (
        <Outlet context={user} />
      )}
    </>
  );
};

export default SharedLayout;
