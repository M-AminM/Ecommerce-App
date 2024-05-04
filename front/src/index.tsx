import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/tailwind.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      throwOnError: true,
      retry: 1,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#243F2F",
                algorithm: true,
                colorLink: "red",
              },
              Input: {
                colorPrimary: "#243F2F",
                algorithm: true,
                fontSize: 16,
                colorBgBase: "#EDF5EC",
              },
              Slider: {
                colorPrimary: "#243F2F",
                algorithm: true,
              },
              Checkbox: {
                colorPrimary: "#243F2F",
                algorithm: true,
              },
              // Spin: {
              //   colorPrimary: "#243F2F",
              //   algorithm: true,
              // },
              Radio: {
                colorPrimary: "#243F2F",
                algorithm: true,
              },
            },
          }}
        >
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
