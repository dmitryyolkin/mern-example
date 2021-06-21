import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  // based on jwt token
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

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

  // get user data from local storage on loading
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, userId, token, ready };
};
