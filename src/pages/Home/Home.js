import { useContext, useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useSearchParams } from "react-router-dom";
import HeaderContainer from "../../containers/Header/HeaderContainer";
import HeroContainer from "../../containers/Hero/HeroContainer";
import NavActionsMobileContainer from "../../containers/NavActionsMobile/NavActionsMobileContainer";
import SidePanelsContainer from "../../containers/SidePanels/SidePanels";
import Categories from "../../components/Categories/Categories";
import { AppSettingsContext, BREAK_POINTS } from "../../contexts/AppSettings";
import ProductList from "../../containers/Products/ProductList";
import { ModalContext, VIEWS as VIEWS_MODALS } from "../../contexts/Modal";
import "./Home.css";

const Home = () => {
  const searchParams = useSearchParams()[0];
  const { isMobileView, currentWidth } = useContext(AppSettingsContext);
  const { openModal, closeModal, state } = useContext(ModalContext);

  useEffect(() => {
    if (searchParams.get("category")) {
      scroller.scrollTo("products-categories", {
        smooth: true,
        offset: -103,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("token") && searchParams.get("userId")) {
      openModal(VIEWS_MODALS.AUTH_RESET_PASSWORD);
    } else if (
      searchParams.get("confirmationCode") &&
      searchParams.get("userId")
    ) {
      openModal(VIEWS_MODALS.AUTH_ACTIVATION_ACCOUNT);
    } else {
      if (state.isOpen) {
        closeModal();
      }
    }
  }, []);

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
