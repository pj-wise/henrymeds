import { useState } from "react";
import providersMockData from "./_mock/providers";
import ProvidersForm from "./components/ProvidersForm";
import "./App.css";

function App() {
  return (
    <>
      <h1>Henry Meds</h1>
      <h3>{providersMockData.name}</h3>
      <ProvidersForm />
    </>
  );
}

export default App;
