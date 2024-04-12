import React, { type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { RoutesData } from "./routes/route";
import SuspenseWrapper from "./components/SuspenseWrapper";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {RoutesData.map((route) => (
          <Route
            path={route.path}
            element={<SuspenseWrapper path={route.pathComponent} />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
