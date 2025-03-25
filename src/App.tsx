import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./app/layout";
import Training from "./page/training";
import Configuration from "./page/configuration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Training />} />
          <Route path="/configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
