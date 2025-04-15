"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/Loader";

// Define the interface for a Resume object
interface Resume {
  resume_id: string; // Adjust the type based on your backend data
  upload_date: string; // ISO string or adjust as needed
  resume_name: string;
}

const UploadResume: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]); // Fetched resumes with proper typing
  const [isLoading, setIsLoading] = useState<boolean>(false); // For loading state
  const [isUploading, setIsUploading] = useState<boolean>(false); // For upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Selected files

  // Fetch resumes from the server
  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://resumeentry-bend.onrender.com/resumes/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data: Resume[] = await response.json();
        setResumes(data);
      } else {
        toast.error("Failed to fetch resume details.");
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
      toast.error("Error fetching resume data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Handle file selection and display file names
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

      // Show uploaded file names in a toast
      const fileNames = files.map((file) => file.name);
      toast.success(`Selected Files: ${fileNames.join(", ")}`);
    } else {
      toast.error("Please select valid files.");
    }
  };

  // Handle file removal
  const handleFileRemove = (fileName: string) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    toast.info(`${fileName} removed.`);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("No files selected.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("resumes", file); // Append each file
    });

    setIsUploading(true);

    try {
      const response = await fetch(
        "https://resumeentry-bend.onrender.com/resumes/bulk-upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Files uploaded successfully!");
        // Optionally, you can refresh the resumes list without reloading the page
        fetchResumes();
        setSelectedFiles([]); // Clear selected files after successful upload
      } else {
        const errorMessage = await response.text();
        toast.error(`File upload failed: ${errorMessage}`);
        console.error("File upload failed:", errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while uploading.");
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <ToastContainer />
      <Breadcrumb pageName="Upload Resume" />

      {/* File Upload Section */}
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> 
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload multiple files (only PDF)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-5 rounded-lg bg-white p-5 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Selected Files:
          </h2>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
              >
                {file.name}
                <button
                  onClick={() => handleFileRemove(file.name)}
                  className="ml-4 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex w-full items-center justify-end">
        <button
          onClick={handleUpload}
          type="button"
          disabled={isUploading}
          className={`mb-2 me-2 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl"
          } focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800`}
        >
          {isUploading ? (
            <svg
              className="mr-2 h-5 w-5 animate-spin text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {/* Fetched Resumes Section */}
      {isLoading ? (
        <div className="mt-10 text-center">
          <Loader />
        </div>
      ) : resumes && resumes.length > 0 ? (
        <div className="mt-10 rounded-lg bg-white p-5 shadow-md dark:bg-gray-800">
          <h1 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Resume List
          </h1>
          <ul className="space-y-4">
            {resumes.map((resume) => (
              <li
                key={resume.resume_id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-medium text-gray-800 dark:text-gray-100">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">
                      ID:
                    </span>{" "}
                    {resume.resume_id}
                  </h2>
                  <span className="text-xs italic text-gray-500 dark:text-gray-400">
                    {new Date(resume.upload_date).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">Name:</span> {resume.resume_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-10 rounded-lg bg-white p-5 shadow-md dark:bg-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No Uploaded resumes available.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadResume;