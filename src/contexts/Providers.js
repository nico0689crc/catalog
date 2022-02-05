import { AuthProvider } from "./AuthContext";
import { AppSettingProvider } from "./AppSettings";
import { SidePanelProvider } from "./SidePanels";
import { QueryClientProvider } from "./QueryClient";
import { ModalProvider } from "./Modal";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <AppSettingProvider>
        <QueryClientProvider>
          <ModalProvider>
            <SidePanelProvider>{children}</SidePanelProvider>
          </ModalProvider>
        </QueryClientProvider>
      </AppSettingProvider>
    </AuthProvider>
  );
};

export default Providers;
