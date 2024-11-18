import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

import { AuthProvider } from "./contexts/AuthContext";

import { store, persistor } from "./store/redux";

import Router from "./router";

import Loading from "./components/Loading/Loading";
import { FMcoreProvider } from "./contexts/FMcoreContext";
import { StoreProvider } from "./contexts/StoreContext";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#3d7cef",
  },
};

const reactQueryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      {/* <FMcoreProvider> */}
      <ReduxProvider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {/* <AuthProvider> */}
          <QueryClientProvider client={reactQueryClient}>
            <StoreProvider>
              <ConfigProvider theme={themeConfig}>
                <BrowserRouter>
                  <ConfigProvider
                    modal={{
                      classNames: {
                        // content: "contentxxx",
                        // body: "bodyxxx",
                        // mask: "maskxxx",
                        // wrapper: "wrapperxxx",
                      },
                    }}
                  >
                    <Router />
                  </ConfigProvider>
                </BrowserRouter>
              </ConfigProvider>
            </StoreProvider>
          </QueryClientProvider>
          {/* </AuthProvider> */}
        </PersistGate>
      </ReduxProvider>
      {/* </FMcoreProvider> */}
    </HelmetProvider>
  );
};

export default App;
