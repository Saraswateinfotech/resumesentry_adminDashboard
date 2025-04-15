
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import { Description, Close } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartDateModal = ({ open, onClose, freelancers_id, allData }) => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (allData.start_date) {
      const [date, time] = allData.start_date.split("T");
      setStartDate(date);
      setStartTime(time ? time.substring(0, 5) : "");
    }
  }, [allData]);

  const handleUpdateFreelancer = async () => {
    if (!freelancers_id) {
      toast.error("Freelancer ID is missing!");
      return;
    }

    if (!startDate || !startTime) {
      toast.error("Please provide both start date and time!");
      return;
    }

    
    let [hours, minutes] = startTime.split(":");
    hours = parseInt(hours, 10);

    if (startTime.includes("AM") && hours === 12) {
      hours = 0; 
    } else if (startTime.includes("PM") && hours < 12) {
      hours += 12; 
    }

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
    const startDateTime = `${startDate}T${formattedTime}:00.000Z`;
    
    // Calculate end date (5 days after start date)
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 5);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const endDateTime = `${formattedEndDate}T${formattedTime}:00.000Z`;

    const body = {
      ...allData,
      start_date: startDateTime,
      end_date: endDateTime,
    };

    try {
      const response = await fetch(
        `https://apis.resumesentry.com/freelancer/${freelancers_id}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Freelancer updated successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error updating freelancer details.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <ToastContainer />
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Description style={{ marginRight: 8, color: "#1976d2" }} />
              <Typography variant="h6">Add Start Date and Time</Typography>
            </Box>
            <IconButton onClick={onClose} color="default">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="subtitle1">Start Date</Typography>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Start Time</Typography>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2" color="textSecondary">
              Note: End date will be automatically set to 5 days after the start date
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateFreelancer}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartDateModal;