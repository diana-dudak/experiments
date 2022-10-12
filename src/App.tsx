import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./shared/Nav";
import InventoryGrid from "./pages/inventoryGrid";
import Canvas from "./pages/canvas";
import DevProdMode from "./pages/devProdMode";
import ImagesUnknownAmmount from "./pages/imagesUnknownAmmount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="App__body">
          <Routes>
            <Route path="inventoryGrid" element={<InventoryGrid />} />
            <Route path="canvas" element={<Canvas />} />
            <Route path="devProdMode" element={<DevProdMode />} />
            <Route path="imagesUnknownAmmount" element={<ImagesUnknownAmmount />} />
            {/* No match route */}
            <Route path="*" element={<Navigate to="devProdMode" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
