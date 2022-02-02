import { AuthProvider } from "./AuthContext";
import { AppSettingProvider } from "./AppSettings";
import { SidePanelProvider } from "./SidePanels";
import { QueryClientProvider } from "./QueryClient";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <AppSettingProvider>
        <QueryClientProvider>
          <SidePanelProvider>{children}</SidePanelProvider>
        </QueryClientProvider>
      </AppSettingProvider>
    </AuthProvider>
  );
};

export default Providers;
