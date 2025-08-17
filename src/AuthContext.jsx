import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [username, setUsername] = useState();

  const signUp = async (body) => {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseJSON = await response.json(); //{success: ... , message: 'Thanks for signing up!', token: '....'}
      const responseJSONToken = responseJSON.token; //{token: '....'}
      setToken(responseJSONToken);
      setLocation("TABLET"); // Move to next location, which is the TABLET location
    } catch (error) {
      console.log(error);
    }
  };

  const authenticate = async () => {
    try {
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJSON = await response.json();
      const usernameFromToken = responseJSON.data.username;
      //if username value from authenticate API and user input matches
      // enter the tunnel by removing the setLocation state variable.
      if (usernameFromToken === username) setLocation();
    } catch (error) {
      console.log(error);
    }
  };

  const value = { location, signUp, setUsername, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
