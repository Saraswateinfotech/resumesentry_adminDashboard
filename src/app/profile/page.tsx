"use client";

import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import {
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";

// export const metadata: Metadata = {
//   title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const Profile = () => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/editprofile`);
  };
  const handleCreateKYCClick = () => {
    router.push(`/createkyc`);
  };
  const handleAddBankClick = () => {
    router.push(`/addbankdetails`);
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
                <span>
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </label>
            </div>
          </div> */}
          <div className="edit-btn m-5 pb-2 text-end">
            <button
              onClick={() => handleEditClick()}
              className="rounded-md  bg-indigo-500 p-3 font-medium text-blue-600 shadow-lg hover:underline dark:text-blue-500"
            >
              <span className="text-white">
                <FaEdit />
              </span>
            </button>
          </div>
          <div className="mt-10 px-4 pb-6 pt-10 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  className="h-full w-full rounded-full object-cover object-center"
                  src={"/images/user/imageshu.png"}
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  {/* <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  /> */}
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Danish Heilium
              </h3>
              <p className="font-medium ">
                <span className="rounded-sm bg-amber-500 p-1 text-boxdark-2">
                User ID: FL241203224033
                </span>
              </p>
              <p className="pt-3 font-medium">
                <span className="rounded-sm	 bg-red-600 p-1  text-boxdark-2">
                Date: Dec, 09 2024                </span>
              </p>
              <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 text-center shadow dark:border-gray-700 dark:bg-gray-800 sm:p-4">
                <div className="border-b">
                  <h5 className="border-bottom mb-2 text-left text-xl font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h5>
                </div>
                <div className="mt-2 flex flex-col">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Mobile:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        8864800001
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Alternate Number:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:flex-row flex-col">
  <div className="flex items-center gap-2">
    <MailIcon className="h-5 w-5 text-gray-900 dark:text-white" />
    <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
      Email ID:
    </p>
  </div>
  <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400 md:mt-0 mt-2">
    1prabhanshusharma050703@gmail.com
  </p>
</div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Date Of Birth:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Gender:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Monthly Income:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LocationMarkerIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Address:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AcademicCapIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Education:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                        <p className="text-left text-sm font-medium text-gray-900 dark:text-white">
                          Occupation:
                        </p>
                      </div>
                      <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 text-center shadow dark:border-gray-700 dark:bg-gray-800 sm:p-4">
                <button
                  type="button"
                  onClick={() => handleCreateKYCClick()}
                  className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-10 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Create KYC
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBankClick()}
                  className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Add Bank Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
