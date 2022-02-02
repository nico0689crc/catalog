import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { pages } from "./pages";

const RoutesContainer = () => {
  const auth = useContext(AuthContext);
  const { token } = auth;

  const routes = (
    <Routes>
      <Route path="/" element={pages.home} />
    </Routes>
  );

  return routes;
};

export default RoutesContainer;
