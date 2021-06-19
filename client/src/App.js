import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import "materialize-css";

function App() {
  const { login, logout, userId, token, tokenVerified } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ login, logout, userId, token, isAuthenticated, tokenVerified }}
    >
      <Router>
        <div className="container">{routes}</div>;
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
