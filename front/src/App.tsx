import React, { type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { RoutesData } from "./routes/route";
import SuspenseWrapper from "./components/SuspenseWrapper";
import LoginPage from "./pages/Auth";
import Guard from "./utils/guard";
import { AxiosInterceptor } from "./service/interceptor";

const App: FC = () => {
  const protectedRoutes = RoutesData.filter((route) => route.isProtected);
  const notProtectedRoutes = RoutesData.filter((route) => !route.isProtected);
  const token = localStorage.getItem("token");

  return (
    <AxiosInterceptor token={token}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/login"
            element={
              <React.Suspense>
                <LoginPage />
              </React.Suspense>
            }
          />
          {protectedRoutes.map((route) => (
            <Route
              path={route.path}
              element={
                <Guard>
                  <SuspenseWrapper path={route.pathComponent} />
                </Guard>
              }
            />
          ))}
          {notProtectedRoutes.map((route) => (
            <Route
              path={route.path}
              element={<SuspenseWrapper path={route.pathComponent} />}
            />
          ))}
        </Route>
      </Routes>
    </AxiosInterceptor>
  );
};

export default App;
