import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Application = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData,
    fetchUserApplications
   } =
    useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(()=>{
   if(user){
    fetchUserApplications()
   }
  },[user])

  return (
    <>
      <Navbar />
      <div className="container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]">
        <h2 className="text-2xl font-semibold mb-4">Your Resume</h2>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {isEdit  || userData && userData.resume === ""
          ? (
            <>
              <label
                htmlFor="resumeUpload"
                className="flex items-center gap-2 cursor-pointer"
              >
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img
                  src={assets.profile_upload_icon}
                  alt="Upload Icon"
                  className="w-5 h-5"
                />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 text-green-700 border border-green-400 rounded-md px-4 py-2 hover:bg-green-200 transition"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a target="_blank"  href={userData.resume} 
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"

              >
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-400 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-400  text-left">
                  Company
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left">
                  Job Title
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">
                  Location
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">
                  Date
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-400">
                    <img
                      className="w-8 h-8 object-contain"
                      src={job.companyId.image}
                      alt="Logo"
                    />
                    {job.companyId.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-400">
                    {job.jobId.title}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-400 max-sm:hidden">
                    {job.jobId.location}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-400 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-400">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                        job.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
