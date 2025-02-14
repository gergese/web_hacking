import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/mainPage/MainPage";
import EventPage from "./pages/event/EventPage";
import EventDetailPage from "./pages/event/EventDetailPage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import MyPage from "./pages/mypage/MyPage";
import GoodsListPage from "./pages/trade/GoodsListPage";
import GoodsDetailPage from "./pages/trade/GoodsDetailPage";
import PaymentPage from "./pages/trade/PaymentPage";
import EventWritePage from "./pages/event/EventWritePage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/goodslist", element: <GoodsListPage /> },
        { path: "/goodsdetail/:id", element: <GoodsDetailPage /> },
        { path: "/payment", element: <PaymentPage /> },
        { path: "/event", element: <EventPage /> },
        { path: "/eventwrite", element: <EventWritePage /> },
        { path: "/event/:id", element: <EventDetailPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignUpPage /> },
        { path: "/mypage", element: <MyPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
