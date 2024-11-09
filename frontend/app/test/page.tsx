"use client";
import React, { useState } from "react";

const CustomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sheet
  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleSheet}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Open Sheet
      </button>

      {/* Overlay - Only shown when sheet is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={toggleSheet}
        />
      )}

      {/* Sheet Container */}
      <div
        className={`
          fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Sheet Content */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sheet Title</h2>
            <button
              onClick={toggleSheet}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <p>Your sheet content goes here...</p>
            <p>Add any components or content you need.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSheet;
