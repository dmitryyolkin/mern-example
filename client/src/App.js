import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import { NavBar } from "./components/NavBar";
import { Loader } from "./components/Loader";
import "materialize-css";

function App() {
  const { login, logout, userId, token, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    // show Loader until token is verified
    return (
      <div className="loading-wrapper valign-wrapper center-align">
        <div className="row">
          <div className="col s6 offset-s6">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, userId, token, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container">{routes}</div>;
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
