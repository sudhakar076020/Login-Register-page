import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ marginTop: "50px" }}
      />
    </Router>
  );
};

export default App;
