import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotifcationDispatch } from "../components/NotificationContext.jsx";
import { useUserDispatch, useUserValue } from "../components/UserContext.jsx";
import BlogCard from "../components/BlogCard.jsx";
import LoginForm from "../components/LoginForm.jsx";
import BlogForm from "../components/BlogForm.jsx";
import Togglable from "../components/Togglable.jsx";
import blogService from "../services/blogs.js";
import loginService from "../services/login.js";

const Home = () => {
  const queryClient = useQueryClient();
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const { mutate: createBlog } = useMutation({
    mutationFn: blogService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          type: "success",
          text: `A new blog "${data.title}" added`,
        },
      });
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "danger", text: error.response.data.error },
      });
    },
  });
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const sortedBlogs = blogs?.toSorted((a, b) => b.likes - a.likes);
  const notificationDispatch = useNotifcationDispatch();

  const handleLogin = async (userInputs) => {
    try {
      const user = await loginService.login(userInputs);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    } catch (error) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          type: "error",
          text: error.response.data.error,
        },
      });
    }
  };

  const addBlog = async (blogInputs) => {
    createBlog(blogInputs);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>blogs service not available due to problems in server</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-2 py-12">
      {!user && <LoginForm login={handleLogin} />}
      {user && (
        <div>
          <Togglable buttonLabel="Create new blog">
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <section className="py-20">
            <h2 className="text-2xl">Blogs</h2>
            <div className="mt-6 grid gap-y-4">
              {sortedBlogs.map((blog) => {
                return <BlogCard key={blog.id} {...blog} />;
              })}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;
