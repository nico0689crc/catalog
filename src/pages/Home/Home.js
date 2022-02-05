import { useContext, useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useSearchParams } from "react-router-dom";
import HeaderContainer from "../../containers/Header/HeaderContainer";
import HeroContainer from "../../containers/Hero/HeroContainer";
import NavActionsMobileContainer from "../../containers/NavActionsMobile/NavActionsMobileContainer";
import SidePanelsContainer from "../../containers/SidePanels/SidePanels";
import Categories from "../../components/Categories/Categories";
import { AppSettingsContext, BREAK_POINTS } from "../../contexts/AppSettings";
import ProductList from "../../components/Products/ProductList";
import "./Home.css";

const Home = () => {
  const searchParams = useSearchParams()[0];
  const { isMobileView, currentWidth } = useContext(AppSettingsContext);

  useEffect(() => {
    if (searchParams.get("category")) {
      scroller.scrollTo("products-categories", {
        smooth: true,
        offset: -103,
      });
    }
  }, [searchParams.get("category")]);

  return (
    <>
      <HeaderContainer />
      {isMobileView && <NavActionsMobileContainer />}

      <SidePanelsContainer />
      <main className="home-main">
        {!isMobileView && <HeroContainer />}
        <Element name="products-categories">
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
