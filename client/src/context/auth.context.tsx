import { createContext } from "react";

function noopLogin(jwtToken: string, id: string) {}
function noopLogout() {}

type AuthContextProps = {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  login: noopLogin,
  logout: noopLogout,
  isAuthenticated: false,
});
