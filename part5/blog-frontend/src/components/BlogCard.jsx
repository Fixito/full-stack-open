import blogService from "../services/blogs.js";
import { useNotifcationDispatch } from "./NotificationContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useUserValue } from "./UserContext.jsx";

const Blog = ({ id, title, author, user: owner }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotifcationDispatch();
  const user = useUserValue();

  const { mutate: deleteBlog } = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          type: "success",
          text: `Blog "${title}" deleted`,
        },
      });
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          type: "error",
          text: error.response.data.error,
        },
      });
    },
  });

  const removeBlog = async () => {
    const isBlogDeleted = confirm(`Remove blog ${title} by ${author}?`);

    if (isBlogDeleted) {
      deleteBlog(id);
    }
  };

  return (
    <article
      className="flex justify-between gap-4 rounded-box bg-base-200 p-4"
      data-testid="blog"
    >
      <Link to={`/blogs/${id}`} className="link link-primary">
        {title}
      </Link>
      {user.id === owner.id && (
        <button className="link link-error" onClick={removeBlog}>
          Remove
        </button>
      )}
    </article>
  );
};

export default Blog;
