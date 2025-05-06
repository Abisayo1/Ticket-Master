import React from "react";


export default function ConcertTicket() {
  return (
    <div className="max-w-xl p-20 absolute right-20 top-[750px]  hidden sm:block shadow-lg rounded-2xl border border-gray-200">
      <img src="image.png" alt="Stadium Map" className="rounded-t-2xl" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          GRAND NATIONAL TOUR: <br /> KENDRICK LAMAR AND SZA
        </h2>
        <p className="text-sm text-gray-600">Fri • May 9, 2025 • 7:00 PM</p>
        <p className="text-sm text-gray-600 mb-2">
          MetLife Stadium - East Rutherford, New Jersey
        </p>
        <p className="text-sm text-gray-800 font-medium">
          SEC 311, Row 2, Seats 3 - 4
        </p>
      </div>
    </div>
  );
}
