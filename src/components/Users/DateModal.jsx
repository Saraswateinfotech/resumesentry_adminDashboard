
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

const DateModal = ({ open, onClose, freelancers_id, allData }) => {
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (allData.end_date) {
      const [date, time] = allData.end_date.split("T");
      setEndDate(date);
      setEndTime(time ? time.substring(0, 5) : "");
    }
  }, [allData]);

  const handleUpdateFreelancer = async () => {
    if (!freelancers_id) {
      toast.error("Freelancer ID is missing!");
      return;
    }

    if (!endDate || !endTime) {
      toast.error("Please provide both end date and time!");
      return;
    }

    let [hours, minutes] = endTime.split(":");
    hours = parseInt(hours, 10);

    if (endTime.includes("AM") && hours === 12) {
      hours = 0; 
    } else if (endTime.includes("PM") && hours < 12) {
      hours += 12; 
    }

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
    const endDateTime = `${endDate}T${formattedTime}:00.000Z`;

    const body = {
      ...allData,
      end_date: endDateTime,
    };

    try {
      const response = await fetch(
        `https://resumeentry-bend.onrender.com/freelancer/${freelancers_id}/edit`,
        {
          method: "PUT", // 👈 Changed from PUT to PATCH
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
              <Typography variant="h6">Add End Date and Time</Typography>
            </Box>
            <IconButton onClick={onClose} color="default">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="subtitle1">End Date</Typography>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">End Time</Typography>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
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

export default DateModal;