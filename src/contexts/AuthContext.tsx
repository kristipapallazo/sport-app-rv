import { createContext, FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react";

import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import useFMcore from "../hooks/useFMcore";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User | null;
  authenticateUser: (user: User) => void;
  unAuthenticateUser: () => void;
  updateUser: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,

  authenticateUser: () => {},
  unAuthenticateUser: () => {},
  updateUser: () => {},
};

const AuthContext = createContext(initialState);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);
  console.log("isAuthenticated :>> ", isAuthenticated);

  // const { FMcore } = useFMcore();

  const authenticateUser = (user: User) => {
    console.log("user :>> ", user);
    setUser(user);
  };

  const unAuthenticateUser = () => {
    setUser(null);
  };

  const updateUser = () => {};

  // useEffect(() => {
  //   authenticateUser(FMcore.getUser());
  // }, [FMcore]);

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        isAuthenticated,
        user,
        authenticateUser,
        unAuthenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
