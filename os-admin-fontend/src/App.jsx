import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavBar } from "./components/NavBar";
import AppRoutes from "./routes/routes";

import { useAuth } from "./utils/auth";
import { setupAxiosInterceptors } from "./utils/axios-utils";
import { ToastContainer } from "react-toastify";
import { SideBar } from "./components/SideBar";
const App = () => {
  const [isActive, setIsActive] = useState(false);
  const auth = useAuth();
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const { logout } = useAuth();
  useEffect(() => {
    setupAxiosInterceptors(logout); 
  }, [logout]);

  return (
    <>
      <div
        className={`wrapper d-flex align-items-stretch ${
          isActive ? "active" : ""
        }`}
      >
        {auth.isAuthenticated && (
          <SideBar isActive={isActive} logout={auth.logout} />
        )}
        <div id="content" className="p-4 p-md-5">
          {auth.isAuthenticated && (
            <NavBar
            user={auth.user}
              isActive={isActive}
              toggleSidebar={toggleSidebar}
              logout={auth.logout}
            />
          )}
          <Container className="mt-4">
            <AppRoutes />
            <ToastContainer />
          </Container>
        </div>
      </div>
    </>
  );
};

export default App;
