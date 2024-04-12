import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/tailwind.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient({});

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
              Spin: {
                colorPrimary: "#243F2F",
                algorithm: true,
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
