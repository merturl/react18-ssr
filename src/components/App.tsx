import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Posts = lazy(() => import("./Posts"));

function App() {
  return (
    <Suspense fallback={<div>this is loading!</div>}>
      <Routes>
        {/* <Route path="/" element={<div>This is Home</div>} /> */}
        <Route path="/profile" element={<Posts />} />
      </Routes>
    </Suspense>
  );
}

export default App;
