// import React from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from "@mui/material";

// const BankDetailsModal = ({ open, onClose, details }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Bank & Personal Details</DialogTitle>
//       <DialogContent>
//         {details && details.length > 0 ? (
//           details.map((detail, index) => (
//             <Box key={index} mb={2}>
//               <Typography variant="body1">
//                 <strong>Name:</strong> {detail.name}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Address:</strong> {detail.address}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Account Number:</strong> {detail.accountNumber}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Bank:</strong> {detail.bankName} ({detail.branchName})
//               </Typography>
//               <Typography variant="body2">
//                 <strong>IFSC:</strong> {detail.ifscCode}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Email:</strong> {detail.email}
//               </Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography>No Details Available</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BankDetailsModal;

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
// } from "@mui/material";
// import axios from "axios";

// const BankDetailsModal = ({ open, onClose, details }) => {
//   const freelancerId = details.freelancerId;
//   const [detailss, setDetailss] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       if (!freelancerId) return;

//       setLoading(true);
//       setError("");
//       try {
//         const token = localStorage.getItem("token"); // Get the token from local storage
//         const response = await axios.get(`https://resumeentry-bend.onrender.com/resumes/getBankDetails/${freelancerId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the header
//           },
//         });
//         setDetailss(response.data); // Assuming the API response contains the details
//       } catch (err) {
//         setError("Failed to load bank details. Please try again.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (open) {
//       fetchBankDetails();
//     }
//   }, [open, freelancerId]);

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Bank & Personal Details</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : detailss && detailss.length > 0 ? (
//           details.map((detail, index) => (
//             <Box key={index} mb={2}>
//               <Typography variant="body1">
//                 <strong>Name:</strong> {detail.name}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Address:</strong> {detail.address}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Account Number:</strong> {detail.accountNumber}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Bank:</strong> {detail.bankName} ({detail.branchName})
//               </Typography>
//               <Typography variant="body2">
//                 <strong>IFSC:</strong> {detail.ifscCode}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Email:</strong> {detail.email}
//               </Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography>No Details Available</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BankDetailsModal;


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
// } from "@mui/material";
// import axios from "axios";

// const BankDetailsModal = ({ open, onClose, freelancers_id }) => {
//   const [fetchedDetails, setFetchedDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       if (!freelancers_id || !open) return;

//       setLoading(true);
//       setError("");
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `https://resumeentry-bend.onrender.com/resumes/getBankDetails/${freelancers_id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setFetchedDetails(response.data);
//       } catch (err) {
//         setError("Failed to load bank details. Please try again.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBankDetails();
//   }, [freelancers_id, open]);

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Bank & Personal Details</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" py={3}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : fetchedDetails && fetchedDetails.length > 0 ? (
//           fetchedDetails.map((detail, index) => (
//             <Box key={index} mb={2}>
//               <Typography variant="body1">
//                 <strong>Name:</strong> {detail.name}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Address:</strong> {detail.address}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Account Number:</strong> {detail.accountNumber}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Bank:</strong> {detail.bankName} ({detail.branchName})
//               </Typography>
//               <Typography variant="body2">
//                 <strong>IFSC:</strong> {detail.ifscCode}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Email:</strong> {detail.email}
//               </Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography>No Details Available</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BankDetailsModal;



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
// } from "@mui/material";
// import axios from "axios";

// const BankDetailsModal = ({ open, onClose, freelancers_id }) => {
//   const [fetchedDetails, setFetchedDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       if (!freelancers_id || !open) return;

//       setLoading(true);
//       setError("");
//       setFetchedDetails(null);

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication token not found");
//         }

//         console.log("Fetching details for ID:", freelancers_id); // Debug ID

//         const response = await axios.get(
//           `https://resumeentry-bend.onrender.com/resumes/getBankDetails/${freelancers_id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Response Data:", response.data); // Debug response
//         setFetchedDetails(response.data || null);
//       } catch (err) {
//         console.error("Error fetching details:", err); // Debug error
//         setError(
//           err.response?.data?.message || "Failed to load bank details. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (open) {
//       fetchBankDetails();
//     }
//   }, [freelancers_id, open]);

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Bank & Personal Details</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" py={3}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : fetchedDetails ? (
//           <Box mb={2}>
//             <Typography variant="body1">
//               <strong>Account Holder Name:</strong> {fetchedDetails.account_holder_name || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Account Number:</strong> {fetchedDetails.account_number || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>IFSC Code:</strong> {fetchedDetails.ifsc_code || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Bank Name:</strong> {fetchedDetails.bank_name || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Account Type:</strong> {fetchedDetails.account_type || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Payment Method:</strong> {fetchedDetails.payment_method || "N/A"}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Payment Mobile Number:</strong> {fetchedDetails.payment_mobile_number || "N/A"}
//             </Typography>
//           </Box>
//         ) : (
//           <Typography>No Details Available</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BankDetailsModal;









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
  Divider,
} from "@mui/material";
import { AccountBalance, ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import axios from "axios";

const BankDetailsModal = ({ open, onClose, freelancers_id }) => {
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBankDetails = async () => {
      if (!freelancers_id || !open) return;

      setLoading(true);
      setError("");
      setFetchedDetails(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }

        console.log("Fetching details for ID:", freelancers_id); // Debug ID

        const response = await axios.get(
          `https://resumeentry-bend.onrender.com/resumes/getBankDetails/${freelancers_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Response Data:", response.data); // Debug response
        setFetchedDetails(response.data || null);
      } catch (err) {
        console.error("Error fetching details:", err); // Debug error
        setError(
          err.response?.data?.message || "Failed to load bank details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchBankDetails();
    }
  }, [freelancers_id, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <AccountBalance style={{ marginRight: 8, color: "#1976d2" }} />
          Bank & Personal Details
        </Box>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" alignItems="center" justifyContent="center" py={3}>
            <ErrorOutline color="error" style={{ marginRight: 8 }} />
            <Typography color="error">{error}</Typography>
          </Box>
        ) : fetchedDetails ? (
          <Box>
            {[
              { label: "Account Holder Name", value: fetchedDetails.account_holder_name },
              { label: "Account Number", value: fetchedDetails.account_number },
              { label: "IFSC Code", value: fetchedDetails.ifsc_code },
              { label: "Bank Name", value: fetchedDetails.bank_name },
              { label: "Account Type", value: fetchedDetails.account_type },
              { label: "Payment Method", value: fetchedDetails.payment_method },
              { label: "Payment Mobile Number", value: fetchedDetails.payment_mobile_number },
            ].map((detail, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1" color="textPrimary">
                  <strong>{detail.label}:</strong> {detail.value || "N/A"}
                </Typography>
                {index < 6 && <Divider style={{ margin: "8px 0" }} />}
              </Box>
            ))}
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" py={3}>
            <CheckCircleOutline style={{ color: "#4caf50", marginRight: 8 }} />
            <Typography>No Details Available</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BankDetailsModal;

