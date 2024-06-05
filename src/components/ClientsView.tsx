import React, { useState, useEffect } from 'react';
import { Button, Grid, Snackbar, Alert, TextField, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { providers, Slot, generateSlotsForDate, getAvailableDates  } from '../_mock/providers.ts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ClientsView: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [openWarningSnackbar, setOpenWarningSnackbar] = useState<boolean>(false);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const slotsPerPage = 9;
  
    const availableDates = getAvailableDates();
  
    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
      setSelectedDate(newValue);
      setSelectedSlot(null); // Clear selected slot when date changes
      setCurrentPage(0);
      if (newValue) {
        const slots = generateSlotsForDate(newValue);
        setAvailableSlots(slots);
      } else {
        setAvailableSlots([]);
      }
    };
  
    const handleSlotSelection = (slot: Slot) => {
      setSelectedSlot(slot);
      setOpenWarningSnackbar(true);
    };
  
    const confirmReservation = () => {
      if (selectedSlot) {
        console.log('Reservation confirmed:', selectedSlot);
        setAvailableSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== selectedSlot.id));
        setOpenSnackbar(true);
        setSelectedSlot(null);
        setOpenWarningSnackbar(false);
      }
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    const handleCloseWarningSnackbar = () => {
      setOpenWarningSnackbar(false);
    };
  
    useEffect(() => {
      if (selectedSlot) {
        const timer = setTimeout(() => {
          setOpenWarningSnackbar(false);
          setSelectedSlot(null);
        }, 30 * 60 * 1000); // 30 minutes
        return () => clearTimeout(timer);
      }
    }, [selectedSlot]);
  
    const isDateSelectable = (date: dayjs.Dayjs) => {
      const today = dayjs().startOf('day');
      return date.isAfter(today.add(1, 'day')) && availableDates.includes(date.format('YYYY-MM-DD'));
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(availableSlots.length / slotsPerPage)));
    };
  
    const paginatedSlots = availableSlots.slice(currentPage * slotsPerPage, (currentPage + 1) * slotsPerPage);
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Book an Appointment</h2>
          <div className="mb-4">
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
              shouldDisableDate={(date) => !isDateSelectable(date)}
            />
          </div>
          {paginatedSlots.length > 0 && (
            <div className="mb-4">
              <Grid container spacing={2}>
                {paginatedSlots.map((slot) => (
                  <Grid item xs={4} key={slot.id}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleSlotSelection(slot)}
                    >
                      {slot.startTime} - {slot.endTime}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <div className="flex justify-between mt-4">
                <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
                  <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleNextPage} disabled={(currentPage + 1) * slotsPerPage >= availableSlots.length}>
                  <ArrowForwardIcon />
                </IconButton>
              </div>
            </div>
          )}
          {selectedSlot && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Confirm Reservation</h3>
              <p className="mt-2">{`Time: ${selectedSlot.startTime} - ${selectedSlot.endTime}`}</p>
              <Button className="mt-4" variant="contained" color="primary" onClick={confirmReservation}>
                Confirm
              </Button>
            </div>
          )}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              Reservation confirmed successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openWarningSnackbar} autoHideDuration={6000} onClose={handleCloseWarningSnackbar}>
            <Alert onClose={handleCloseWarningSnackbar} severity="warning" sx={{ width: '100%' }}>
              Please confirm within 30 minutes, or your reservation may be released.
            </Alert>
          </Snackbar>
        </div>
      </LocalizationProvider>
    );
  };
  
  export default ClientsView;