

// "use client";
// import dynamic from "next/dynamic";
// import React, { useEffect, useState } from "react";
// import ChartOne from "../Charts/ChartOne";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
// import CardDataStats from "../CardDataStats";
// import { MdPendingActions } from "react-icons/md";
// import { SiFuturelearn } from "react-icons/si";
// import Loader from "../common/Loader";


// const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
//   ssr: false,
// });

// const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
//   ssr: false,
// });

// const ECommerce: React.FC = () => {
//   const steps = [
//     { id: 1, title: "Account Registered" },
//     { id: 2, title: "Work in Progress" },
//     { id: 3, title: "Work Submitted" },
//     { id: 4, title: "Review Report" },
//     { id: 5, title: "Final Report" },
//     { id: 6, title: "Payout Requested" },
//     { id: 7, title: "Payout Approved" },
//     { id: 8, title: "Payout Released" },
//   ];

//   // const [resumeStats, setResumeStats] = useState<any>(null); // Use a default value of null
//   // const token = localStorage.getItem("token");

//   // useEffect(() => {
//   //   const fetchResumeStats = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         "https://resumeentry-bend.onrender.com/resumes/GetResumeReportForAdmin",
//   //         {
//   //           method: "GET",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             Authorization: "Bearer " + token,
//   //           },
//   //         }
//   //       );

//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setResumeStats(data); // Set the response data to resumeStats
//   //       } else {
//   //         console.error("Failed to fetch resume stats");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching resume stats:", error);
//   //     }
//   //   };

//   //   fetchResumeStats();
//   // }, [token]);

//   const [resumeStats, setResumeStats] = useState<any>(null); // Use a default value of null
//   const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
//   const [error, setError] = useState<string | null>(null); // State to manage error message
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null; // Ensure it's run on the client

//   useEffect(() => {
//     if (!token) {
//       setError("No token found");
//       setLoading(false);
//       return;
//     }

//     const fetchResumeStats = async () => {
//       setLoading(true); // Set loading to true when making the request
//       try {
//         const response = await fetch(
//           "https://resumeentry-bend.onrender.com/resumes/GetResumeReportForAdmin",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setResumeStats(data); // Set the response data to resumeStats
//           setLoading(false); // Set loading to false when data is fetched
//         } else {
//           throw new Error("Failed to fetch resume stats");
//         }
//       } catch (error: any) {
//         setLoading(false); // Set loading to false in case of error
//         setError(error.message); // Set error message
//         console.error("Error fetching resume stats:", error);
//       }
//     };

//     fetchResumeStats();
//   }, [token]);

//   return (
//     <>

//     {
//       loading ?(
//         <Loader/>
//       ):(

//         <div>
    
    
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
//       {/* Resumes Completed Today */}
//       <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 shadow-lg flex justify-between items-center">
//         <div>
//           <h3 className="text-sm font-medium">Resumes Completed Today</h3>
//           <p className="text-2xl font-bold">
//             {resumeStats ? resumeStats.resume_completed_today : "Loading..."}
//           </p>
//         </div>
//         <div className="text-3xl bg-zinc-600 p-2 rounded-md">
//           <MdPendingActions />
//         </div>
//       </div>
    
//       {/* Total Resumes Completed */}
//       <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-4 shadow-lg flex justify-between items-center">
//         <div>
//           <h3 className="text-sm font-medium">Total Resumes Completed</h3>
//           <p className="text-2xl font-bold">
//             {resumeStats ? resumeStats.total_resume_completed : "Loading..."}
//           </p>
//         </div>
//         <div className="text-3xl bg-zinc-600 p-2 rounded-md">
//           <SiFuturelearn />
//         </div>
//       </div>
//     </div>
    
    
//           <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//             <ChartOne />
//             <ChartTwo resumeData={resumeStats} />
//             {/* <ChartThree /> */}
//             {/* <MapOne /> */}
    
//             <div className="col-span-12 xl:col-span-8">{/* <TableOne /> */}</div>
//             {/* <ChatCard /> */}
//           </div>
//           <div className="mt-4 grid border rounded-md shadow-md w-full">
//       <div className="flex flex-col md:flex-row items-center justify-center py-6 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-6">
//         {steps.map((step, index) => (
//           <div
//             key={step.id}
//             className="relative flex flex-col items-center w-full md:w-auto"
//           >
//             {/* Line between steps */}
//             {index !== 0 && (
//               <div className="absolute hidden md:block left-0 top-5 h-0.5 w-[95%] -translate-x-1/2 bg-gray-300"></div>
//             )}
//             {index !== 0 && (
//               <div className="absolute md:hidden top-0 left-5 h-[90%] w-0.5 bg-gray-300"></div>
//             )}
    
//             {/* Step Circle */}
//             <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-md">
//               <span className="text-base font-semibold text-gray-700">
//                 {step.id}
//               </span>
//             </div>
    
//             {/* Step Title */}
//             <p className="mt-3 text-center text-sm md:text-base text-gray-600 leading-tight md:leading-relaxed">
//               {step.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//         </div>
//       )
//     }


//     </>
//   );
// };

// export default ECommerce;













"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import { MdPendingActions } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import Loader from "../common/Loader";

// Define the type for the resumeStats object
type ResumeStats = {
  resume_completed_today: number;
  total_resume_completed: number;
  // You can add other properties as needed, depending on what the API returns
};

// Define the props for the ChartTwo component
interface ChartTwoProps {
  resumeData: ResumeStats;
}

// Dynamically import other components
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  const steps = [
    { id: 1, title: "Account Registered" },
    { id: 2, title: "Work in Progress" },
    { id: 3, title: "Work Submitted" },
    { id: 4, title: "Review Report" },
    { id: 5, title: "Final Report" },
    { id: 6, title: "Payout Requested" },
    { id: 7, title: "Payout Approved" },
    { id: 8, title: "Payout Released" },
  ];

  // Define the state for resumeStats, loading, and error
  const [resumeStats, setResumeStats] = useState<ResumeStats | null>(null); // Default value is null
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Get the token from localStorage (only in the browser)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    const fetchResumeStats = async () => {
      setLoading(true); // Set loading to true when making the request
      try {
        const response = await fetch(
          "https://resumeentry-bend.onrender.com/resumes/GetResumeReportForAdmin",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setResumeStats(data); // Set the response data to resumeStats
          setLoading(false); // Set loading to false when data is fetched
        } else {
          throw new Error("Failed to fetch resume stats");
        }
      } catch (error: any) {
        setLoading(false); // Set loading to false in case of error
        setError(error.message); // Set error message
        console.error("Error fetching resume stats:", error);
      }
    };

    fetchResumeStats();
  }, [token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Your UI for the Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {/* Resumes Completed Today */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Resumes Completed Today</h3>
                <p className="text-2xl font-bold">
                  {resumeStats ? resumeStats.resume_completed_today : "Loading..."}
                </p>
              </div>
              <div className="text-3xl bg-zinc-600 p-2 rounded-md">
                <MdPendingActions />
              </div>
            </div>

            {/* Total Resumes Completed */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-4 shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Total Resumes Completed</h3>
                <p className="text-2xl font-bold">
                  {resumeStats ? resumeStats.total_resume_completed : "Loading..."}
                </p>
              </div>
              <div className="text-3xl bg-zinc-600 p-2 rounded-md">
                <SiFuturelearn />
              </div>
            </div>
          </div>

          {/* Charts and Data */}
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne />
            {/* Fix: Add conditional rendering for ChartTwo */}
            {resumeStats ? (
              <ChartTwo resumeData={resumeStats} />
            ) : (
              <p>Loading resume data...</p>
            )}
            {/* <ChartThree /> */}
            {/* <MapOne /> */}

            <div className="col-span-12 xl:col-span-8">{/* <TableOne /> */}</div>
            {/* <ChatCard /> */}
          </div>

          {/* Steps */}
          <div className="mt-4 grid border rounded-md shadow-md w-full">
            <div className="flex flex-col md:flex-row items-center justify-center py-6 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center w-full md:w-auto"
                >
                  {/* Line between steps */}
                  {index !== 0 && (
                    <div className="absolute hidden md:block left-0 top-5 h-0.5 w-[95%] -translate-x-1/2 bg-gray-300"></div>
                  )}
                  {index !== 0 && (
                    <div className="absolute md:hidden top-0 left-5 h-[90%] w-0.5 bg-gray-300"></div>
                  )}

                  {/* Step Circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-md">
                    <span className="text-base font-semibold text-gray-700">
                      {step.id}
                    </span>
                  </div>

                  {/* Step Title */}
                  <p className="mt-3 text-center text-sm md:text-base text-gray-600 leading-tight md:leading-relaxed">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ECommerce;
