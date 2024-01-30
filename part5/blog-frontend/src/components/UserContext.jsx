import { createContext, useReducer, useContext, useEffect } from "react";
import blogService from "../services/blogs.js";

const UserContext = createContext();

const initiaState = null;

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initiaState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));

    if (user) {
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const { userDispatch } = useContext(UserContext);
  return userDispatch;
};

export default UserContextProvider;
