import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]">
        <h2 className="text-2xl font-semibold mb-4">Your Resume</h2>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {isEdit ? (
            <>
              <label
                htmlFor="resumeUpload"
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition">
                  Select Resume
                </span>
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
                onClick={() => setIsEdit(false)}
                className="bg-green-100 text-green-700 border border-green-400 rounded-md px-4 py-2 hover:bg-green-200 transition"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"
                href=""
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
                <th className="py-3 px-4 border-b border-gray-400  text-left">Company</th>
                <th className="py-3 px-4 border-b border-gray-400 text-left">Job Title</th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">Location</th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">Date</th>
                <th className="py-3 px-4 border-b border-gray-400 text-left max-sm:hidden">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-400">
                    <img className="w-8 h-8 object-contain" src={job.logo} alt="Logo" />
                    {job.company}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-400">{job.title}</td>
                  <td className="py-3 px-4 border-b border-gray-400 max-sm:hidden">
                    {job.location}
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
