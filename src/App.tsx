import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InventoryGrid from "./pages/inventoryGrid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="inventoryGrid" element={<InventoryGrid />} />
        <Route path="*" element={<Navigate to="inventoryGrid" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
