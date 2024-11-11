import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header";

export const App = () => {
  const [activePage, setActivePage] = useState("articles");

  return (
    <>
      <Header activePage={activePage} setActivePage={setActivePage} />
      <BrowserRouter>
        <div className="pt-24 pb-6 w-full">
          <Routes>
            <Route path="/" element={<Home activePage={activePage} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
