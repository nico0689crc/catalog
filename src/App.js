import RoutesContainer from "./containers/Routes";
import Providers from "./contexts/Providers";

function App() {
  return (
    <Providers>
      <RoutesContainer />
    </Providers>
  );
}

export default App;
