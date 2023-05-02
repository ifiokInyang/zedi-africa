import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Table from "./redux/features/Table/Table";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
