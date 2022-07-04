import { Fragment } from "react";
import "twin.macro";

import { Router } from "./Routes";
import { Layout } from "./components/layout/Layout";
import GlobalStyles from "./style/GlobalStyles";

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />

      <Layout>
        <Router />
      </Layout>
    </Fragment>
  );
};

export default App;
