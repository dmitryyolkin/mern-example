import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes: React.FC<Boolean> = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route component={LinksPage} path="/links" exact />
        <Route component={CreatePage} path="/create" exact />
        <Route component={DetailPage} path="/detail/:id" />
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route component={AuthPage} path="/" exact />
      <Redirect to="/" />
    </Switch>
  );
};
