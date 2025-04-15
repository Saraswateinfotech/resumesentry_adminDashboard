// "use client";

// import { ApexOptions } from "apexcharts";
// import React from "react";
// import dynamic from "next/dynamic";

// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// const options: ApexOptions = {
//   colors: ["#3C50E0", "#80CAEE"],
//   chart: {
//     fontFamily: "Satoshi, sans-serif",
//     type: "bar",
//     height: 335,
//     stacked: true,
//     toolbar: {
//       show: false,
//     },
//     zoom: {
//       enabled: false,
//     },
//   },

//   responsive: [
//     {
//       breakpoint: 1536,
//       options: {
//         plotOptions: {
//           bar: {
//             borderRadius: 0,
//             columnWidth: "25%",
//           },
//         },
//       },
//     },
//   ],
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       borderRadius: 0,
//       columnWidth: "25%",
//       borderRadiusApplication: "end",
//       borderRadiusWhenStacked: "last",
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },

//   xaxis: {
//     categories: ["M", "T", "W", "T", "F", "S", "S"],
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "left",
//     fontFamily: "Satoshi",
//     fontWeight: 500,
//     fontSize: "14px",

//     // markers: {
//     //   radius: 99,
//     // },
//     markers: {
//       size: 10, // Corrected the property here
//     },
//   },
//   fill: {
//     opacity: 1,
//   },  
// };

// interface ChartTwoState {
//   series: {
//     name: string;
//     data: number[];
//   }[];
// }

// const ChartTwo: React.FC = () => {
//   const series = [
//     {
//       name: "Sales",
//       data: [44, 55, 41, 67, 22, 43, 65],
//     },
//     {
//       name: "Revenue",
//       data: [13, 23, 20, 8, 13, 27, 15],
//     },
//   ];

//   return (
//     <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
//       <div className="mb-4 justify-between gap-4 sm:flex">
//         <div>
//           <h4 className="text-xl font-semibold text-black dark:text-white">
//           My Progress
//          </h4>
//           {/* <h4 className="text-xl font-semibold text-black dark:text-white">
//             Profit this week
//           </h4> */}
//         </div>
//         <div>
//           {/* <div className="relative z-20 inline-block">
//             <select
//               name="#"
//               id="#"
//               className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
//             >
//               <option value="" className="dark:bg-boxdark">
//                 This Week
//               </option>
//               <option value="" className="dark:bg-boxdark">
//                 Last Week
//               </option>
//             </select>
//             <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
//               <svg
//                 width="10"
//                 height="6"
//                 viewBox="0 0 10 6"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
//                   fill="#637381"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
//                   fill="#637381"
//                 />
//               </svg>
//             </span>
//           </div> */}
//         </div>
//       </div>

//       <div>
//         <div id="chartTwo" className="-mb-9 -ml-5">
//           <ReactApexChart
//             options={options}
//             series={series}
//             type="bar"
//             height={350}
//             width={"100%"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartTwo;







// "use client";

// import React from "react";

// // Define prop types for ProgressBar
// interface ProgressBarProps {
//   label: string;
//   value: number;
//   total: number;
//   color: string;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, total, color }) => {
//   return (
//     <div className="mb-4">
//       <div className="flex justify-between items-center">
//         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           {label}
//         </span>
//         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           {value}/{total}
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
//         <div
//           className="h-4 rounded-full"
//           style={{
//             width: `${(value / total) * 100}%`,
//             backgroundColor: color,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// // Define prop types for ChartTwo
// interface ResumeData {
//   total_uploaded_resume?: number;
//   resume_completed_today?: number;
//   total_resume_completed?: number;
//   total_submitted_resume?: number;
//   total_active_user?: number;
// }

// interface ChartTwoProps {
//   resumeData?: ResumeData;
// }

// const ChartTwo: React.FC<ChartTwoProps> = ({ resumeData }) => {
//   const safeResumeData = resumeData || {};

//   const total_uploaded_resume = safeResumeData.total_uploaded_resume || 0;
//   const resume_completed_today = safeResumeData.resume_completed_today || 0;
//   const total_resume_completed = safeResumeData.total_resume_completed || 0;
//   const total_submitted_resume = safeResumeData.total_submitted_resume || 0;
//   const total_active_user = safeResumeData.total_active_user || 0;

//   const data = [
//     { label: "Total Uploaded Resumes", value: safeResumeData.total_uploaded_resume || 0, total: total_uploaded_resume, color: "#3C50E0" },
//     { label: "Completed Today Resumes", value: safeResumeData.resume_completed_today || 0, total: resume_completed_today, color: "#34C759" },
//     { label: "Total Completed Resumes", value: safeResumeData.total_resume_completed || 0, total: total_resume_completed, color: "#FF6B6B" },
//     { label: "Total Submitted Resumes", value: safeResumeData.total_submitted_resume || 0, total: total_submitted_resume, color: "#E0E0E0" },
//     { label: "Total Active User", value: safeResumeData.total_active_user || 0, total: total_active_user,  color: "#FFAB00" },
//   ];

//   return (
//     <div className="col-span-12 rounded-md border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark xl:col-span-4">
//       <h4 className="text-2xl font-semibold text-black dark:text-white mb-6">
//         My Progress
//       </h4>
//       {data.map((item, index) => (
//         <ProgressBar
//           key={index}
//           label={item.label}
//           value={item.value}
//           total={item.total}
//           color={item.color}
//         />
//       ))}
//     </div>
//   );
// };

// export default ChartTwo;



"use client";

import React from "react";

// Define prop types for ProgressBar
interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, total, color }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="h-4 rounded-full"
          style={{
            width: `${(value / total) * 100}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};

// Define prop types for ChartTwo
interface ResumeData {
  total_uploaded_resume?: number;
  resume_completed_today?: number;
  total_resume_completed?: number;
  total_submitted_resume?: number;
  total_active_user?: number;
}

interface ChartTwoProps {
  resumeData?: ResumeData;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ resumeData }) => {
  const safeResumeData = resumeData || {};

  const total_uploaded_resume = safeResumeData.total_uploaded_resume || 0;
  const resume_completed_today = safeResumeData.resume_completed_today || 0;
  const total_resume_completed = safeResumeData.total_resume_completed || 0;
  const total_submitted_resume = safeResumeData.total_submitted_resume || 0;
  const total_active_user = safeResumeData.total_active_user || 0;

  const data = [
    { label: "Total Uploaded Resumes", value: total_uploaded_resume, total: total_uploaded_resume, color: "#3C50E0" },
    { label: "Completed Today Resumes", value: resume_completed_today, total: resume_completed_today, color: "#FFAB00" },
    { label: "Total Completed Resumes", value: total_resume_completed, total: total_resume_completed, color: "#FF6B6B" },
    { label: "Total Submitted Resumes", value: total_submitted_resume, total: total_submitted_resume, color: "#E0E0E0" },
    { label: "Total Active User", value: total_active_user, total: total_active_user, color: "#34C759" },
  ];

  return (
    <div className="col-span-12 rounded-md border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="text-2xl font-semibold text-black dark:text-white mb-6">
        My Progress
      </h4>
      {data.map((item, index) => (
        <ProgressBar
          key={index}
          label={item.label}
          value={item.value}
          total={item.total}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default ChartTwo;
