import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "./Config";

const AuthGuard = ({ children }) => {
  const appContext = useContext(AppContext);
  const { state, setState } = appContext;

  const jwtToken = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (
      !state.isAuthenticated &&
      (jwtToken != null || jwtToken !== undefined)
    ) {
      console.log("validToken");
      validToken();
    }
  }, [state.isAuthenticated]);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  function validToken() {
    axios
      .get(config.baseUrl + "user/" + userId, authConfig)
      .then(function (response) {
        console.log(response.data);
        setState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          user: response.data.user,
        }));
        localStorage.setItem("userId", response.data.user.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>{state.isAuthenticated ? children : <Navigate to="/login" />}</div>
  );
};

export default AuthGuard;
