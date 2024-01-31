import { Link, useOutletContext, useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const users = useOutletContext();
  const { name, blogs } = users.find((u) => u.id === id);

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-2">
      <h2 className="text-2xl font-semibold">{name}</h2>
      {blogs.length > 0 ? (
        <>
          <h3 className="text-xl">Added blogs</h3>
          <ul role="list">
            {blogs.map((blog, i) => {
              const { id, title } = blog;
              return (
                <li key={i}>
                  <Link to={`/blogs/${id}`} className="link link-primary">
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h3 className="text-xl">No Blogs added</h3>
      )}
    </main>
  );
};

export default SingleUser;
