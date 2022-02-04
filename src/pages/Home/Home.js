import { useContext } from "react";
import { Element } from "react-scroll";
import HeaderContainer from "../../containers/Header/HeaderContainer";
import HeroContainer from "../../containers/Hero/HeroContainer";
import NavActionsMobileContainer from "../../containers/NavActionsMobile/NavActionsMobileContainer";
import SidePanelsContainer from "../../containers/SidePanels/SidePanels";
import Categories from "../../components/Categories/Categories";
import { AppSettingsContext, BREAK_POINTS } from "../../contexts/AppSettings";
import "./Home.css";
import ProductList from "../../components/Products/ProductList";

const Home = () => {
  const { isMobileView, currentWidth } = useContext(AppSettingsContext);

  return (
    <>
      <HeaderContainer />
      {isMobileView && <NavActionsMobileContainer />}
      <SidePanelsContainer />
      <main className="home-main">
        {!isMobileView && <HeroContainer />}
        <Element>
          <div className="products-categories__container">
            {currentWidth >= BREAK_POINTS.tablet && (
              <div className="products-categories__left-side">
                <Categories />
              </div>
            )}

            <div className="products-categories__right-side">
              <ProductList />
            </div>
          </div>
        </Element>
      </main>
    </>
  );
};

export default Home;
