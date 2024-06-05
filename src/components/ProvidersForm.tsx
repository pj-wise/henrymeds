import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface ProvidersFormProps {
  onSubmit: (date: string, startTime: string, endTime: string) => void;
}

const ProvidersForm: React.FC<ProvidersFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setDate(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (date && startTime && endTime) {
      onSubmit(date.format("YYYY-MM-DD"), startTime, endTime);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Provider Schedule Management
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DatePicker
            label="Select Date"
            value={date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes
            }}
            fullWidth
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes
            }}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Schedule
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Schedule submitted successfully!
          </Alert>
        </Snackbar>
      </div>
    </LocalizationProvider>
  );
};

export default ProvidersForm;
