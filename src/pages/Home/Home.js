import { useContext } from "react";
import HeaderContainer from "../../containers/Header/HeaderContainer";
import HeroContainer from "../../containers/Hero/HeroContainer";
import NavActionsMobileContainer from "../../containers/NavActionsMobile/NavActionsMobileContainer";
import ProductsContainer from "../../containers/Products/ProductsContainer";
import SidePanelsContainer from "../../containers/SidePanels/SidePanels";
import { AppSettingsContext } from "../../contexts/AppSettings";

const Home = () => {
  const { isMobileView } = useContext(AppSettingsContext);

  return (
    <main className="home-main">
      <HeaderContainer />
      {!isMobileView && <HeroContainer />}
      <ProductsContainer />
      {isMobileView && <NavActionsMobileContainer />}
      <SidePanelsContainer />
    </main>
  );
};

export default Home;
