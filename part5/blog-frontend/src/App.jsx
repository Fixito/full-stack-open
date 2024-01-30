import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotificationContextProvider from "./components/NotificationContext.jsx";
import UserContextProvider from "./components/UserContext.jsx";
import { SharedLayout, SharedUsersLayout } from "./layouts";
import { Error, Home, SingleBlog, SingleUser, Users } from "./pages";
import { loader as usersLoader } from "./pages/Users.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        element: <SharedUsersLayout />,
        loader: usersLoader,
        children: [
          {
            index: true,
            element: <Users />,
          },
          { path: ":id", element: <SingleUser /> },
        ],
      },
      {
        path: "blogs/:id",
        element: <SingleBlog />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </NotificationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
