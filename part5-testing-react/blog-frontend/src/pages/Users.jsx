import { Link, useOutletContext } from "react-router-dom";
import * as userService from "../services/users.js";

export const loader = async () => {
  const users = await userService.getAll();
  return users;
};

const Users = () => {
  const users = useOutletContext();

  return (
    <main className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl">Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const { id, name, blogs } = user;
              return (
                <tr key={id}>
                  <td>
                    <Link to={`/users/${id}`} className="link link-primary">
                      {name}
                    </Link>
                  </td>
                  <td>{blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
