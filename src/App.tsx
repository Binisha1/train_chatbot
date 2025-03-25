import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./app/layout";
import Training from "./page/training";
import Customization from "./page/customization";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Training />} />
          <Route path="/customization" element={<Customization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
