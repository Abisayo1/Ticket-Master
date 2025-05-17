import React from "react";

const TicketHeader = () => {
  return (
    <div className="bg-gray-900 text-white flex justify-between items-center px-4 py-3">
      <button className="text-2xl">&times;</button>
      <h1 className="text-base font-medium">My Tickets</h1>
      <button className="text-sm">Help</button>
    </div>
  );
};

export default TicketHeader;