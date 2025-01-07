import "./App.css";
import React from "react";
import CurrencySwapForm from "./components/SwapForm/CurrencySwapForm";

const App: React.FC = () => {
  return (
    <div className="container">
      <img
        id="logo"
        src="https://www.99tech.co/assets/img/99Tech.png"
        alt="99tech-logo"
      />
      <CurrencySwapForm />
    </div>
  );
};

export default App;
