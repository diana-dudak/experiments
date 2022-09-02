import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./shared/Nav";
import InventoryGrid from "./pages/inventoryGrid";
import Canvas from "./pages/canvas";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="App__body">
          <Routes>
            <Route path="inventoryGrid" element={<InventoryGrid />} />
            <Route path="canvas" element={<Canvas />} />
            {/* No match route */}
            <Route path="*" element={<Navigate to="canvas" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
