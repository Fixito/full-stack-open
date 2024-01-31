import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as commentService from "../services/comments.js";

const CommentForm = ({ blogId }) => {
  const queryClient = useQueryClient();

  const { mutate: createCommentMutation } = useMutation({
    mutationFn: commentService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "danger", text: error.response.data.error },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    createCommentMutation({ blogId, text: comment });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment" className="sr-only">
        comment
      </label>
      <div className="join">
        <input
          type="text"
          name="comment"
          id="comment"
          className="input join-item input-bordered"
          placeholder="Comment"
        />
        <button className="btn btn-primary join-item rounded-r-full">
          Add comment
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
