
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import { Description, ErrorOutline, Close } from "@mui/icons-material";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const KycModal = ({ open, onClose, freelancers_id,allData }) => {
//   const [documentURL, setDocumentURL] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchDocument = async () => {
//       if (!freelancers_id || !open) return;

//       setLoading(true);
//       setError("");
//       setDocumentURL("");

//       try {
//         const url = `https://resumeentry-bend.onrender.com/resumes/downloadAadharCard/${freelancers_id}`;
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error("Document not available.");
//         }

//         const blob = await response.blob();
//         const fileURL = URL.createObjectURL(blob);
//         setDocumentURL(fileURL);
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocument();
//   }, [freelancers_id, open]);

//   const handleApproval = async (status) => {
//     if (!freelancers_id || !status) {
//       toast.error("Invalid Admin or status");
//       return;
//     }

//     const formData = {
//       freelancer_id: freelancers_id,
//       status: status,
//     };

//     try {
//       const response = await fetch(
//         "https://resumeentry-bend.onrender.com/resumes/updateApprovalStatus",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         toast.success(responseData.message || `${status} updated successfully!`);
//         setTimeout(() => {
//           onClose();
//         }, 3000);
        
        
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.error || "Error updating status");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//     <ToastContainer astStyle={{ backgroundColor: "#333", color: "#fff" }} />
//         <DialogTitle>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Box display="flex" alignItems="center">
//               <Description style={{ marginRight: 8, color: "#1976d2" }} />
//               <Typography variant="h6">KYC Document</Typography>
//             </Box>
//             <IconButton onClick={onClose} color="default">
//               <Close />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center" py={3}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Box display="flex" alignItems="center" justifyContent="center" py={3}>
//               <ErrorOutline color="error" style={{ marginRight: 8 }} />
//               <Typography color="error">{error}</Typography>
//             </Box>
//           ) : documentURL ? (
//             <Box display="flex" justifyContent="center" alignItems="center" py={3}>
//               <embed
//                 src={documentURL}
//                 type="application/pdf"
//                 width="100%"
//                 height="400px"
//                 style={{ borderRadius: "8px" }}
//               />
//             </Box>
//           ) : (
//             <Typography>No Document Found</Typography>
//           )}
//         </DialogContent>
//         {
//           allData.is_approved == true ? (
//             <></>
//           ):(

//         <DialogActions>
//           <Button onClick={() => handleApproval("rejected")} color="error" variant="contained">
//             Reject
//           </Button>
//           <Button onClick={() => handleApproval("accepted")} color="success" variant="contained">
//             Accept
//           </Button>
//         </DialogActions>
//           )
//         }
//       </Dialog>
//     </>
//   );
// };

// export default KycModal;







"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { Description, ErrorOutline, Close } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KycModal = ({ open, onClose, freelancers_id, allData }) => {
  const [documentURL, setDocumentURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [documentURLs, setDocumentURLs] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [rejectionHistory, setRejectionHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDocument = async () => {
      if (!freelancers_id || !open) return;

      setLoading(true);
      setError("");
      setDocumentURL("");

      try {
        const url = `https://resumeentry-bend.onrender.com/resumes/downloadAadharCard/${freelancers_id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Document not available.");
        }

        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);
        setDocumentURL(fileURL);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [freelancers_id, open]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!freelancers_id || !open) return;

      setLoadings(true);
      setErrors("");
      setDocumentURLs("");

      try {
        const url = `https://resumeentry-bend.onrender.com/resumes/downloadAddressCard/${freelancers_id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Document not available.");
        }

        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);
        setDocumentURLs(fileURL);
      } catch (err) {
        setErrors(err.message || "An unexpected error occurred.");
      } finally {
        setLoadings(false);
      }
    };

    fetchDocuments();
  }, [freelancers_id, open]);

  const handleApproval = async (status) => {
    if (!freelancers_id || !status) {
      toast.error("Invalid Admin or status");
      return;
    }

    const formData = {
      freelancer_id: freelancers_id,
      status: status,
      id_reject_reason: status === "rejected" ? rejectReason : "",            
    };

    try {
      const response = await fetch(
        "https://resumeentry-bend.onrender.com/resumes/updateApprovalStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || `${status} updated successfully!`);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error updating status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <ToastContainer />
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Description style={{ marginRight: 8, color: "#1976d2" }} />
              <Typography variant="h6">KYC Documents</Typography>
              {/* {JSON.stringify(allData)} */}
            </Box>
            <IconButton onClick={onClose} color="default">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
        <Typography variant="h10">KYC ID Proof</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box display="flex" alignItems="center" py={3}>
              <ErrorOutline color="error" style={{ marginRight: 8 }} />
              <Typography color="error">{error}</Typography>
            </Box>
          ) : documentURL ? (
            <Box display="flex" justifyContent="center" py={3}>
              <embed
                src={documentURL}
                type="application/pdf"
                width="100%"
                height="400px"
                style={{ borderRadius: "8px" }}
              />
            </Box>
          ) : (
            <Typography>No Document Found</Typography>
          )}

          <Box mt={3}>
            {rejectionHistory.map((entry, index) => (
              <Typography key={index}>
                {entry.status}: {entry.reason}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogContent>
        <Typography variant="h10">KYC Address Proof Document</Typography>
          {loadings ? (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress />
            </Box>
          ) : errors ? (
            <Box display="flex" alignItems="center" py={3}>
              <ErrorOutline color="error" style={{ marginRight: 8 }} />
              <Typography color="error">{error}</Typography>
            </Box>
          ) : documentURLs ? (
            <Box display="flex" justifyContent="center" py={3}>
              <embed
                src={documentURLs}
                type="application/pdf"
                width="100%"
                height="400px"
                style={{ borderRadius: "8px" }}
              />
            </Box>
          ) : (
            <Typography>No Document Found</Typography>
          )}
        </DialogContent>
        {!allData.is_approved  ? (
          <DialogActions>
            <TextField
              select
              label="Reject Reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              fullWidth
            >
              <MenuItem value="Complete your profile">Complete your profile</MenuItem>
              <MenuItem value="Invalid address">Invalid address</MenuItem>
              <MenuItem value="Address miss match">Address miss match</MenuItem>
            </TextField>

            <Button
              onClick={() => handleApproval("rejected")}
              color="error"
              variant="contained"
              disabled={!rejectReason}
            >
              Reject
            </Button>

            <Button
              onClick={() => handleApproval("accepted")}
              color="success"
              variant="contained"
            >
              Accept
            </Button>
          </DialogActions>
        ):""}
      </Dialog>
    </>
  );
};

export default KycModal;
