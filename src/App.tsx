import { CardsContextProvider } from "@context";
import { Container } from "./Container";

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Outlet />} errorElement={<></>}>
      <Route path='/' element={<Container />} />
    </Route>
  )
);

function App() {
  return (
    <CardsContextProvider>
      <RouterProvider router={router} />
    </CardsContextProvider>
  );
}

export default App;
