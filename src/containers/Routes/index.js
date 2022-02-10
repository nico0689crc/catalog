import { Route, Routes } from "react-router-dom";
import { pages } from "./pages";

const RoutesContainer = () => {
  const routes = (
    <Routes>
      <Route path="/" element={pages.home} />
    </Routes>
  );

  return routes;
};

export default RoutesContainer;
