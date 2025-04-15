"use client";

import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
  MRT_Row,
} from "material-react-table";
import { Box, Button, Switch } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import Loader from "../common/Loader";
import BankDetailsModal from "./BankDetailsModal";
import KycModal from "./KycModal";
import DateModal from "./DateModal";
import StartDateModal from "./StartDateModal";
import "./indexUser.css";

import axios from "axios";
import { MdEdit } from "react-icons/md";

const columnHelper = createMRTColumnHelper();

// CSV Configuration
const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// Columns Definition
const columns = [
  columnHelper.accessor("freelancer_id", {
    header: "ID",
    size: 40,
  }),
  columnHelper.accessor("user_id", {
    header: "Usr ID",
    size: 40,
  }),
  columnHelper.accessor("textpassword", {
    header: "Password",
    size: 40,
  }),
  columnHelper.accessor("name", {
    header: "User Name",
    size: 120,
  }),
  columnHelper.accessor("phone_number", {
    header: "Phone Number",
    size: 120,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 120,
  }),
  // columnHelper.accessor("start_date", {
  //   header: "Date",
  //   size: 120,
  // }),
  // columnHelper.accessor("start_date", {
  //   header: "Start Date",
  //   size: 120,
  //   Cell: ({ row }) => {
  //     const [open, setOpen] = useState(false);
  //     const [details, setDetails] = useState(null);
  //     const [allData, setAllData] = useState([]);

  //     const handleOpen = () => {
  //       setDetails(row.original.user_id);
  //       setAllData(row.original);
  //       setOpen(true);
  //     };

  //     const handleClose = () => {
  //       setOpen(false);
  //     };

  //     return (
  //       <Box display="flex" alignItems="center" gap={1}>
  //         {/* Formatted Start Date */}
  //         <Box>
  //           {row.original.start_date
  //             ? new Date(row.original.start_date).toLocaleString("en-GB", {
  //                 timeZone: "UTC",
  //                 day: "2-digit",
  //                 month: "2-digit",
  //                 year: "numeric",
  //                 hour: "2-digit",
  //                 minute: "2-digit",
  //                 second: "2-digit",
  //               })
  //             : "N/A"}
  //         </Box>

  //         {/* Edit Button */}
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           size="small"
  //           sx={{ minWidth: "40px", padding: "5px" }}
  //           onClick={handleOpen}
  //         >
  //           <MdEdit size={16} />
  //         </Button>

  //         {/* Modal Component */}
  //         <StartDateModal
  //           open={open}
  //           onClose={handleClose}
  //           freelancers_id={details}
  //           allData={allData}
  //         />
  //       </Box>
  //     );
  //   },
  // }),
  columnHelper.accessor("start_date", {
    header: "Start /login Date",
    size: 120,
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [details, setDetails] = useState(null);
      const [allData, setAllData] = useState([]);

      const handleOpen = () => {
        setDetails(row.original.user_id);
        setAllData(row.original);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <Box display="flex" alignItems="center" gap={1}>
          {/* Formatted Start Date */}
          <Box>
            {row.original.start_date
              ? new Date(row.original.start_date).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                
                })
              : "N/A"}
          </Box>
        </Box>
      );
    },
  }),
  columnHelper.accessor("end_date", {
    header: "End Date",
    size: 120,
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [details, setDetails] = useState(null);
      const [allData, setAllData] = useState([]);

      const handleOpen = () => {
        setDetails(row.original.user_id);
        setAllData(row.original);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <Box display="flex" alignItems="center" gap={1}>
          {/* Formatted Start Date */}
          <Box>
            {row.original.end_date
              ? new Date(row.original.end_date).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A"}
          </Box>

          {/* Edit Button */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: "40px", padding: "5px" }}
            onClick={handleOpen}
          >
            <MdEdit size={16} />
          </Button>

          {/* Modal Component */}
          <DateModal
            open={open}
            onClose={handleClose}
            freelancers_id={details}
            allData={allData}
          />
        </Box>
      );
    },
  }),
  columnHelper.accessor("is_active", {
    header: "Active",
    size: 120,
    Cell: ({ row }) => {
      const [actionState, setActionState] = useState(row.original.is_active);
      const token = localStorage.getItem("token");
      const user_id = row.original.user_id;

      const handleToggle = async () => {
        const updatedState = !actionState;
        try {
          // Call the API to update the status
          await axios.put(
            `https://resumeentry-bend.onrender.com/freelancer/${user_id}/status`,
            { is_active: updatedState ? 1 : 0 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          // If successful, update the state
          setActionState(updatedState);
          console.log(
            `Action for ID ${row.original.id}: ${updatedState ? "ON" : "OFF"}`,
          );
        } catch (error) {
          // Handle the error appropriately
          console.error("Error updating status:", error);
        }
      };

      return (
        <Box>
          <Switch
            checked={actionState}
            onChange={handleToggle}
            color="primary"
            inputProps={{ "aria-label": "action toggle" }}
          />
          {actionState ? "On" : "Off"}
        </Box>
      );
    },
  }),
  columnHelper.accessor("bank_PersonalDetails", {
    header: "Bank&Personal Details",
    size: 120,
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [details, setDetails] = useState(null);

      const handleOpen = () => {
        setDetails(row.original.user_id);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: "1px" }}
            onClick={handleOpen}
          >
            View Details
          </Button>
          <BankDetailsModal
            open={open}
            onClose={handleClose}
            freelancers_id={details}
          />
        </Box>
      );
    },
  }),
  columnHelper.accessor("kycStatus", {
    header: "KYC Status",
    size: 120,
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [details, setDetails] = useState(null);
      const [allData, setAllData] = useState([]);

      const handleOpen = () => {
        setDetails(row.original.user_id);
        setAllData(row.original);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: "1px" }}
            onClick={handleOpen}
          >
            View KYC Status
          </Button>
          <KycModal
            open={open}
            onClose={handleClose}
            freelancers_id={details}
            allData={allData}
          />
        </Box>
      );
    },
  }),
];

const Users = () => {
  const [data, setData] = useState([]); // State for table data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://resumeentry-bend.onrender.com/freelancer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        if (result.freelancers) {
          setData(result.freelancers); // Set fetched data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Loading message
  }

  return (
    <div className="overflow-x-auto">
      <div className="indexred overflow-x-auto overflow-y-auto">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default Users;
