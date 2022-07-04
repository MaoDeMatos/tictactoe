import { Fragment } from "react";
import "twin.macro";

import { Home } from "./pages/Home";
import GlobalStyles from "./style/GlobalStyles";

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />

      {/* <Layout>
        <Router />
      </Layout> */}

      <Home />
    </Fragment>
  );
};

export default App;
