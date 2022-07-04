import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import Test from "./pages/Test";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};
