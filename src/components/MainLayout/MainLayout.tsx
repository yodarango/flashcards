import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

// styles
import "./MainLayout.scss";

export const MainLayout = () => {
  return (
    <div className='main-layout-56yl'>
      <Header className='mb-8' />
      <main className='main-layout-56yl__content'>
        <Outlet />
      </main>
    </div>
  );
};
