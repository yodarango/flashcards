import {
  ROUTE_WORDS_BY_COMMON_PHRASES_TITLE,
  ROUTE_WORDS_BY_COMMON_PHRASES,
  ROUTE_HOME,
} from "@constants";
import {
  ViewWordsByCommonPhrasesTitle,
  ViewWordsByCommonPhrases,
  ViewIndex,
} from "@views";

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
      <Route
        element={<ViewWordsByCommonPhrasesTitle />}
        path={ROUTE_WORDS_BY_COMMON_PHRASES_TITLE}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
