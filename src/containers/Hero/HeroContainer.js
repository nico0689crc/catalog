import { useContext } from "react";
import { Waypoint } from "react-waypoint";
import { AppSettingsContext } from "../../contexts/AppSettings";
import heroBanner from "../../assets/images/heroBanner.jpeg";
import InputSearchHero from "../../components/InputSearchHero/InputSearchHero";
import "./HeroContainer.css";

const HeroContainer = () => {
  const { setDisplayHeaderFixed } = useContext(AppSettingsContext);

  const onWaypointPositionChange = ({ currentPosition }) => {
    setDisplayHeaderFixed(currentPosition === "above");
  };

  return (
    <div className="hero-container">
      <img
        className="hero-container__image"
        src={heroBanner}
        alt="Hero banner"
      />
      <div className="hero-container__content">
        <h1>Groceries Delivered in 90 Minute</h1>
        <p>
          Get your healthy foods & snacks delivered at your doorsteps all day
          everyday
        </p>
        <div className="hero-container__input-search">
          <InputSearchHero />
        </div>
      </div>

      <Waypoint onPositionChange={onWaypointPositionChange} />
    </div>
  );
};

export default HeroContainer;
