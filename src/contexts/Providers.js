import { AuthProvider } from "./AuthContext";
import { AppSettingProvider } from "./AppSettings";
import { SidePanelProvider } from "./SidePanels";
import { QueryClientProvider } from "./QueryClient";
import { ModalProvider } from "./Modal";
import { CartProvider } from "./Cart/Cart";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <AppSettingProvider>
        <QueryClientProvider>
          <CartProvider>
            <ModalProvider>
              <SidePanelProvider>{children}</SidePanelProvider>
            </ModalProvider>
          </CartProvider>
        </QueryClientProvider>
      </AppSettingProvider>
    </AuthProvider>
  );
};

export default Providers;
