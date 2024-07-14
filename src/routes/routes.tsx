import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Main from "../components/main";

import { Auth, Movie } from "../pages";
import Protected from "./protected";

const Routes = () => {
  const isAuthenticated = false;
  return (
    <Switch>
      <Route path="/" element={<Main />} />
      <Route path="movies">
        <Route index element={<Movie.Main />} />
        <Route path=":movieID" element={<Movie.Single />} />
        <Route
          path=":movieID/episodes/:episodeID"
          element={<Movie.SingleEpisodes />}
        />
      </Route>

      <Route path="user">
        <Route
          index
          element={
            isAuthenticated ? (
              <Auth.Login />
            ) : (
              <Navigate to={"/user/favorites/:userID"} />
            )
          }
        />
        <Route
          path="/user/favorites/:userID"
          element={
            isAuthenticated ? (
              <Movie.Favorite />
            ) : (
              <Navigate to={"/auth/login"} />
            )
          }
        />
      </Route>

      <Route
        path="auth"
        element={<Protected allowed={!isAuthenticated} to="/movies" />}
      >
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route index path="*" element={<Navigate to={"/auth/login"} />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Switch>
  );
};

export default Routes;
