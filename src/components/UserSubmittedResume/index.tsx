"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, Button, TextField } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Loader from "../common/Loader";
import ShowResume from "./ShowResume";
import "../Users/indexUser.css";

// ****************** Add Select Components ******************
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Configuration for Select Menu
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Define the comprehensive Resume interface
interface Resume {
  submission_id: number;
  resume_id: string;
  freelancer_id: string;
  freelancer_name?: string;
  submission_date: string;
  status?: string;
  approval_status?: string;
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  email?: string;
  mobile?: string;
  city?: string;
  state?: string;
  pincode?: string;
  passport?: string;
  address?: string;
  landmark?: string;
  graduation_degree?: string;
  graduation_university?: string;
  graduation_year_of_passing?: string;
  graduation_result?: string;
  post_graduation_degree?: string;
  post_graduation_university?: string;
  post_graduation_year_of_passing?: string;
  post_graduation_result?: string;
  hsc_board?: string;
  hsc_result?: string;
  hsc_year_of_passing?: string;
  ssc_board?: string;
  ssc_result?: string;
  ssc_year_of_passing?: string;
  last_employer?: string;
  number_of_companies_worked?: string;
  higher_education_qualification?: string;
  hobbies?: string;
  languages_known?: string;
  admin_feedback?: string;
  feedback?: string;
  marital_status?: string;
  last_name?: string;
  middle_name?: string;
  total_work_experience_months?: string;
  // Add any other properties your component uses
}

// CSV Headers for Export
const csvHeaders = [
  "Resume ID",
  "Freelancer ID",
  "Freelancer Name",
  "Submission Date",
  "Status",
  "Approval Status",
  "Gender",
  "Date of Birth",
  "Nationality",
  "Email",
  "Mobile",
  "City",
  "State",
  "Pincode",
  "Passport",
  "Address",
  "Landmark",
  "Graduation Degree",
  "Graduation University",
  "Graduation Year of Passing",
  "Graduation Result",
  "Post Graduation Degree",
  "Post Graduation University",
  "Post Graduation Year of Passing",
  "Post Graduation Result",
  "HSC Board",
  "HSC Result",
  "HSC Year of Passing",
  "SSC Board",
  "SSC Result",
  "SSC Year of Passing",
  "Last Employer",
  "Number of Companies Worked",
  "Higher Education Qualification",
  "Hobbies",
  "Languages Known",
  "Marital Status",
  "Last Name",
  "Middle Name",
  "Total Work Experience Months",
];

// Function to Export Data to CSV
const exportToCsv = (rows: Resume[]) => {
  const csvContent =
    csvHeaders.join(",") +
    "\n" +
    rows
      .map((row) =>
        [
          row.resume_id,
          row.freelancer_id,
          row.freelancer_name || "",
          row.submission_date ? new Date(row.submission_date).toISOString() : "",
          row.status || "",
          row.approval_status || "",
          row.gender || "",
          row.date_of_birth ? new Date(row.date_of_birth).toISOString() : "",
          row.nationality || "",
          row.email || "",
          row.mobile || "",
          row.city || "",
          row.state || "",
          row.pincode || "",
          row.passport || "",
          row.address || "",
          row.landmark || "",
          row.graduation_degree || "",
          row.graduation_university || "",
          row.graduation_year_of_passing || "",
          row.graduation_result || "",
          row.post_graduation_degree || "",
          row.post_graduation_university || "",
          row.post_graduation_year_of_passing || "",
          row.post_graduation_result || "",
          row.hsc_board || "",
          row.hsc_result || "",
          row.hsc_year_of_passing || "",
          row.ssc_board || "",
          row.ssc_result || "",
          row.ssc_year_of_passing || "",
          row.last_employer || "",
          row.number_of_companies_worked || "",
          row.higher_education_qualification || "",
          row.hobbies || "",
          row.languages_known || "",

          row.marital_status || "",
          row.last_name || "",
          row.middle_name || "",
          row.total_work_experience_months || "",
        ].join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "resumes.csv";
  link.click();
};

const UserSubmittedResume: React.FC = () => {
  const [data, setData] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ****************** Add Select State ******************
  // const [selectedFreelancers, setSelectedFreelancers] = useState<string[]>([]);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Define the Freelancer type
interface Freelancer {
  freelancer_id: string;
  user_id: string;
  name: string;
}

// State for freelancers and selected freelancers
const [selectedFreelancers, setSelectedFreelancers] = useState<Freelancer[]>([]);

  // const handleChange = (event: SelectChangeEvent<string[]>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedFreelancers(
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const [freelancers, setFreelancers] = useState<{
    freelancer_id: string;
    user_id: string;
    name: string;
  }[]>([]);
  const [selectedRow, setSelectedRow] = useState<Resume[]>([]);
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Update selected rows based on rowSelection state
  useEffect(() => {
    const selectedRowsData = Object.keys(rowSelection)
      .map((idx) => {
        const index = parseInt(idx, 10);
        if (index >= 0 && index < data.length) {
          return data[index];
        }
        return null;
      })
      .filter((resume): resume is Resume => resume !== null);
    setSelectedRow(selectedRowsData);
  }, [rowSelection, data]);

  // Function to Reassign Resumes to Selected Freelancers
  const autoChange = async () => {
    if (!selectedRow || selectedRow.length === 0) {
      toast.error("No resumes selected to reassign.");
      return;
    }

    if (!selectedFreelancers || selectedFreelancers.length === 0) {
      toast.error("Please select a freelancer to reassign resumes.");
      return;
    }

    const submissionIds = selectedRow.map((row) => row.submission_id); // Changed from submission_id to resume_id
    const freelancerIds = selectedFreelancers.map((row) => row.user_id);
    const body = {
      submission_ids: submissionIds,
      freelancer_ids: freelancerIds, // Assuming multiple freelancers can be selected
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      const response = await fetch(
        "https://resumeentry-bend.onrender.com/resumes/reassignResume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        toast.success("Resumes reassigned successfully.");
        // fetchSavedResumes(); // Refresh data after successful reassign
        window.location.reload(); // Removed to avoid full page reload
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to reassign resumes: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error during reassigning resumes:", error);
      toast.error("An error occurred while reassigning resumes.");
    }
  };

  // Fetch Freelancers from Backend
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token is missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get<{
          freelancers: { freelancer_id: string; user_id: string; name: string }[];
        }>("https://resumeentry-bend.onrender.com/freelancer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFreelancers(response.data.freelancers);
      } catch (error: any) {
        console.error(
          "Error fetching freelancers:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to fetch freelancers.");
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  // Define Columns for MaterialReactTable
  const columns: MRT_ColumnDef<Resume>[] = [
    {
      accessorKey: "resume_id",
      header: "Resume ID",
      size: 150,
      filterFn: "contains",
    },
    {
      accessorKey: "freelancer_name",
      header: "Freelancer Name",
      size: 150,
      filterFn: "contains",
      Cell: ({ cell }) => cell.getValue<string>() || "N/A",
    },
    {
      accessorKey: "freelancer_id",
      header: "Freelancer ID",
      size: 150,
      filterFn: "contains",
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      filterFn: "contains",
      Cell: ({ cell }) => {
        const status = cell.getValue<string>();

        const getColor = (status: string) => {
          switch (status) {
            case "Saved":
              return "green";
            case "Auto saved":
              return "lightgreen";
            case "Submitted":
              return "blue";
            case "Auto Submitted":
              return "Teal";
            case "Rejected":
              return "red";
            default:
              return "black";
          }
        };

        return (
          <span style={{ color: getColor(status), fontWeight: "bold" }}>
            {status || "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "submission_date",
      header: "Submitted Date",
      size: 200,
      filterFn: "includesDateRange",
      Cell: ({ cell }) => {
        const dateStr = cell.getValue<string>();
        const date = new Date(dateStr);
        return date.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 150,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row }: { row: MRT_Row<Resume> }) => (
        <button
          onClick={() => handleViewClick(row.original)}
          className="rounded-md bg-indigo-500 p-2 font-medium text-white shadow-lg hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  // Function to Fetch Resumes from Backend
  const fetchSavedResumes = async () => {
    if (!token) {
      toast.error("Authentication token is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{
        submittedResumes: Resume[];
      }>("https://resumeentry-bend.onrender.com/resumes/getAllCompletedResumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.submittedResumes);
    } catch (error: any) {
      toast.error(
        "Error fetching saved resumes:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to fetch saved resumes.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Resumes on Component Mount or Token Change
  useEffect(() => {
    fetchSavedResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Handle View Button Click
  const handleViewClick = (resume: Resume) => {
    setSelectedResume(resume);
  };

  // Handle Back Button Click
  const handleBack = () => {
    setSelectedResume(null);
    fetchSavedResumes(); // Already fetching after reassignment
    // window.location.reload(); // Removed to avoid full page reload
  };


  const updateStatus = async (newStatus:any) => {
    if (!selectedRow || selectedRow.length === 0) {
      toast.error("No resumes selected.");
      return;
    }
          const token = localStorage.getItem("token"); // Retrieve token from localStorage
        
          if (!token) {
            alert("Authentication token is missing. Please log in.");
            return;
          }
          const submissionIds = selectedRow.map((row) => row.submission_id); // Changed from submission_id to resume_id
    const body = {
      submission_id: submissionIds,
      status: newStatus,
    };
          try {
            const response = await fetch(
              "https://resumeentry-bend.onrender.com/resumes/updateResumeStatus",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body),
              }
            );
            
            if (response.ok) {
              toast.success(`${newStatus} successfully`);
              // fetchSavedResumes();
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } 
           
          } catch (error) {
            console.error("Error updating resume status:", error);
          }
        };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : selectedResume ? (
        <div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleBack}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2 text-white" /> {/* Add icon */}
              Back
            </button>
          </div>
          <ShowResume row={selectedResume} allData={data} />
        </div>
      ) : (
        <>
          <div className="indexred">
            <div className="mb-4 flex items-center justify-end bg-white p-3 rounded-sm">
             
<Autocomplete
  multiple
  id="freelancer-select"
  options={freelancers}
  disableCloseOnSelect
  getOptionLabel={(option) => option.name}
  value={selectedFreelancers}
  onChange={(event, newValue) => {
    setSelectedFreelancers(newValue);
  }}
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option.name} ({option.user_id})
    </li>
  )}
  style={{ width: 400 }}
  renderInput={(params) => (
    <TextField {...params} label="Select Freelancer(s)" placeholder="Search freelancers" />
  )}
/>

              <Button
                variant="contained"
                color="primary"
                onClick={autoChange}
                className="m-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Auto Reassign
              </Button>
            </div>
            <div className="mb-4 flex items-center justify-end bg-white p-2 rounded-sm">
      <button
          type="button"
          onClick={() => updateStatus("Rejected")}
          className="mb-2 me-2 rounded-lg bg-gradient-to-br bg-red-700 hover:bg-red-800 px-8 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
        >
          Reject Resume
        </button>
{/* 
        <button
          type="button"
          onClick={() => updateStatus("Accept")}
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-8 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400"
        >
          {" "}
          Accept Resume
        </button> */}
            </div>

            <div className="mx-auto max-w-7xl">
              <MaterialReactTable
                columns={columns}
                data={data}
                enableRowSelection
                enablePagination
                enableSorting
                enableColumnFilters
                enableGlobalFilter
                initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }} // Added pageIndex
                muiPaginationProps={{
                  rowsPerPageOptions: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                  showFirstButton: true,
                  showLastButton: true,
                }}
                muiTableBodyRowProps={{ hover: true }}
                state={{ rowSelection }}
                onRowSelectionChange={setRowSelection}
                renderTopToolbarCustomActions={({ table }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      padding: "8px",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <Button
                        onClick={() => exportToCsv(data)}
                        startIcon={<FileDownloadIcon />}
                      >
                        Export All Data
                      </Button>
                      <Button
                        onClick={() =>
                          exportToCsv(
                            table
                              .getPrePaginationRowModel()
                              .rows.map((row) => row.original)
                          )
                        }
                        startIcon={<FileDownloadIcon />}
                      >
                        Export Filtered Rows
                      </Button>
                      <Button
                        disabled={table.getRowModel().rows.length === 0}
                        onClick={() =>
                          exportToCsv(
                            table.getRowModel().rows.map((row) => row.original)
                          )
                        }
                        startIcon={<FileDownloadIcon />}
                      >
                        Export Page Rows
                      </Button>
                      <Button
                        disabled={
                          !table.getIsSomeRowsSelected() &&
                          !table.getIsAllRowsSelected()
                        }
                        onClick={() =>
                          exportToCsv(
                            table
                              .getSelectedRowModel()
                              .rows.map((row) => row.original)
                          )
                        }
                        startIcon={<FileDownloadIcon />}
                      >
                        Export Selected Rows
                      </Button>
                    </Box>
                  </Box>
                )}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserSubmittedResume;
