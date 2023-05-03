import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Table from "./redux/features/Table/Table";
import { Toaster } from "react-hot-toast";
import User from "./pages/User/User";


function App() {
  return (
    <React.Fragment>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/user/:city?" element={<User />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
