import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { lazy,Suspense } from "react";

const Coins = lazy(() => import('./pages/Coins'));
const Coin = lazy(() => import('./pages/Coin'));
const Chart = lazy(() => import('./pages/Chart'));
const Price = lazy(() => import('./pages/Price'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Coins />
          </Suspense>
        ),
      },
      {
        path: "btc/:coinId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Coin />
          </Suspense>
        ),
        children: [
          {
            path: "chart",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Chart />
              </Suspense>
            ),
          },
          {
            path: "price",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Price />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
],{
  basename: "/crypto-tracker", // 저장소 이름 추가
});

export default router;