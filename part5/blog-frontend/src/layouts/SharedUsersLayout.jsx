import { Outlet, useLoaderData } from "react-router-dom";

const SharedUsersLayout = () => {
  const users = useLoaderData();
  return <Outlet context={users} />;
};

export default SharedUsersLayout;
