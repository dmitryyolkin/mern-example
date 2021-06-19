import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";

const storageName = "userData";

export const useAuth = () => {
  // based on jwt token
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const { request } = useHttp();

  const login = useCallback((jwtToken, id) => {
    setUserId(id);
    setToken(jwtToken);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  const validateToken = useCallback(async () => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      try {
        data = await request("/api/auth/token", "POST", {
          userId: data.userId,
          token: data.token,
        });

        // login with updated tocken
        login(data.token, data.userId);
      } catch (e) {
        console.log("Can't check token: ", e);
        logout();
      }
    } else {
      console.log("no token");
      logout();
    }
  }, [request, login, logout]);

  // get user data from local storage on loading
  useEffect(() => {
    validateToken().catch((err) => {
      console.log("Error on validate token: ", err);
    });
  }, [validateToken]);

  return { login, logout, userId, token };
};
