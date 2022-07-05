import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "twin.macro";

import { Home } from "./pages/Home";
import GlobalStyles from "./style/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />

    <Home />
  </StrictMode>
);
