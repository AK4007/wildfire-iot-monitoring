import React from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const ReportFirePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AnimatedNavbar />
      <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg p-8 rounded">
        <h2 className="text-2xl font-bold text-center mb-6">Report a Fire</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              placeholder="Enter coordinates or location name"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              placeholder="Briefly describe the situation"
              className="w-full border px-4 py-2 rounded"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Upload Photo (optional)</label>
            <input type="file" className="w-full" />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportFirePage;
