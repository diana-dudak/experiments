import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./shared/Nav";
import InventoryGrid from "./pages/inventoryGrid";
import Canvas from "./pages/canvas";
import DevProdMode from "./pages/devProdMode";
import ImagesUnknownAmmount from "./pages/imagesUnknownAmmount";
import { PAGE } from "./shared/Nav/pages";
import ImageMagick from "./pages/imageMagick";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="App__body">
          <Routes>
            <Route path={PAGE.inventoryGrid} element={<InventoryGrid />} />
            <Route path={PAGE.canvas} element={<Canvas />} />
            <Route path={PAGE.devProdMode} element={<DevProdMode />} />
            <Route
              path={PAGE.imagesUnknownAmmount}
              element={<ImagesUnknownAmmount />}
            />
            <Route path={PAGE.imageMagick} element={<ImageMagick />} />
            {/* No match route */}
            <Route
              path="*"
              element={<Navigate to={PAGE.imageMagick} replace />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
