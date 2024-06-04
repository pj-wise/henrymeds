import React from "react";
import providersMockData from "../_mock/providers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";

const ProvidersForm = () => {
  return (
    <div className="w-100">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className="my-2" label="date picker" />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="booking-selection">Book time</InputLabel>
        <Select
          className="tw-my-2"
          labelId="booking-selection-label"
          id="simple-select"
          value={providersMockData.schedule}
          label="Schedule"
          //   onChange={handleChange}
        >
          {providersMockData.schedule.map((time) => {
            return <MenuItem value={time}>{time}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ProvidersForm;
