import { useNotifcationDispatch } from "../components/NotificationContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import blogService from "../services/blogs.js";
import * as CommentService from "../services/comments.js";
import CommentsList from "../components/CommentsList.jsx";
import CommentForm from "../components/CommentForm.jsx";

const Blog = () => {
  const queryClient = useQueryClient();
  const { id: blogId } = useParams();
  const notificationDispatch = useNotifcationDispatch();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => await blogService.getsingle(blogId),
  });

  const {
    data: commentsData,
    isLoadingComments,
    isLoadingError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => await CommentService.getBlogComments(blogId),
  });

  const { mutate: updateBlog } = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "danger", text: error.response.data.error },
      });
    },
  });

  const toggleLike = async (blog) => {
    const { id, title, author, url, likes } = blog;
    const nextBlog = { id, title, author, url, likes: likes + 1 };
    updateBlog(nextBlog);
  };

  if (isLoading || isLoadingComments) {
    return (
      <main>
        <div className="loading loading-spinner" />
      </main>
    );
  }

  if (isError || isLoadingError) {
    return (
      <main>
        <div>blogs service not available due to problems in server</div>
      </main>
    );
  }

  const { id, title, author, url, likes, user } = blog;

  return (
    <main className="mx-auto max-w-6xl px-4" data-testid="blog">
      <section className="space-y-4 py-12">
        <h1 className="text-2xl">
          {title} by <span>{author}</span>
        </h1>
        <Link to={`/blogs/${id}`} className="link link-primary">
          {url}
        </Link>
        <p className="flex items-center gap-4">
          {likes} like{likes > 1 ? "s" : ""}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toggleLike(blog)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Button
          </button>
        </p>
        <p>added by {user.name}</p>
      </section>
      <CommentForm blogId={blogId} />
      <CommentsList comments={commentsData} />
    </main>
  );
};

export default Blog;
