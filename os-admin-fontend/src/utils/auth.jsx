import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState(() => {
    const savedToken = localStorage.getItem("refresh-token");
    return savedToken ? savedToken : null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? savedToken : null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthStatus = localStorage.getItem("isAuthenticated");
    return savedAuthStatus === "true"; // Convert string to boolean
  });
  const login = (userinfo) => {
    const { refreshToken, accessToken } = userinfo;

    try {
      const decodedUser = jwtDecode(accessToken);
      console.log(decodedUser);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));
    } catch (error) {
      console.error("Invalid token:", error);
    }
    setToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);

    localStorage.setItem("isAuthenticated", "true");
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
