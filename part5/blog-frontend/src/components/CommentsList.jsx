const Comments = ({ comments }) => {
  return (
    <section className="py-12">
      <ul className="space-y-4">
        {comments.map((comment) => {
          const { id, text } = comment;
          return <li key={id}>{text}</li>;
        })}
      </ul>
    </section>
  );
};

export default Comments;
