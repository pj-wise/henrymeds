import React from "react";
import providersMockData from "../_mock/providers";

const ProvidersForm = () => {
  return (
    <div>
      {providersMockData.schedule.map((time) => {
        return <p>{time}</p>;
      })}
    </div>
  );
};

export default ProvidersForm;
