import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./styles/index.css";
import "./styles/tailwind.css";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

console.log('App is rendering');


export default App;
