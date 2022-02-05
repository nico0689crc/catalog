import ModalContainer from "./containers/Modals/ModalContainer";
import RoutesContainer from "./containers/Routes";
import Providers from "./contexts/Providers";

function App() {
  return (
    <Providers>
      <RoutesContainer />
      <ModalContainer />
    </Providers>
  );
}

export default App;
