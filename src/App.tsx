import React from "react";
import ProvidersForm from "./components/ProvidersForm";
import ClientsView from "./components/ClientsView";

const App: React.FC = () => {
  const handleProviderSubmit = (
    date: string,
    startTime: string,
    endTime: string,
  ) => {
    console.log("Provider submitted: ", date, startTime, endTime);
  };

  const handleClientConfirm = (slotId: number) => {
    console.log("Client confirmed slot: ", slotId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <ProvidersForm onSubmit={handleProviderSubmit} />
      <ClientsView onConfirm={handleClientConfirm} />
    </div>
  );
};

export default App;
