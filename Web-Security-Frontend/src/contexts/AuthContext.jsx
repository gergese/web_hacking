import { createContext, useState } from "react";

import { parseJwtPayload, getSessionItem } from "../common/utils";
import { PropTypes } from "prop-types";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getSessionItem("session"));

  const authLogin = (data) => {
    setAuth({
      token: data.accessToken,
      payload: parseJwtPayload(data.accessToken),
    });

    sessionStorage.setItem(
      "session",
      JSON.stringify({ token: data.accessToken })
    );
  };

  const authLogout = () => {
    setAuth(null);
    localStorage.removeItem("i");
    sessionStorage.removeItem("session");

    window.location.href = "/";
  };

  const accessToken = {
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  };

  const authId = auth?.payload?.userId;
  const authName = auth?.payload?.userName;
  const authType = auth?.payload?.type;

  const authContextValue = {
    auth,
    accessToken,
    authLogin,
    authLogout,
    authId,
    authName,
    authType,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AuthProvider;
