import { ROUTE_HOME, ROUTE_WORDS_BY_COMMON_PHRASES } from "@constants";
import { ViewIndex, ViewWordsByCommonPhrases } from "@views";
import { CardsContextProvider } from "@context";

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
      <Route path={ROUTE_HOME} element={<ViewIndex />} />
      <Route
        path={ROUTE_WORDS_BY_COMMON_PHRASES}
        element={<ViewWordsByCommonPhrases />}
      />
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
