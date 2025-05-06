import React from "react";

export default function DesktopTicketInsurance() {
    return (
        <div className="max-w-xl mb-4 mx-28 hidden sm:block bg-white p-6 rounded-2xl shadow-md mt-5 border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center justify-between">
                TICKET INSURANCE
                <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">SELECTION REQUIRED</span>
            </h2>

            <p className="text-sm text-gray-700">
                <strong>Get reimbursed</strong> up to 100% of what you spend on tickets including taxes, parking, fees or other event-related items in your order with Event Ticket insurance for only <strong>$23.00 per ticket ($46.00 total)</strong>.
            </p>

            <p className="text-sm text-gray-700">
                If you can't attend this event for a number of covered reasons like a covered illness, airline delays, traffic accidents, weather emergencies, if you are required to work and more, you can be reimbursed for your resale ticket purchase. You’ll also receive access to a 24-hour hotline that can give you driving suggestions, provide parking information, make group arrangements, and much more.
            </p>

            <p className="text-xs text-gray-500">
                Recommended/offered/sold by Allianz Global Assistance. Underwriter: Jefferson Insurance Company. Plan incl. insurance & assistance services. Terms & exclusions (incl. for pre-existing conditions) apply.{' '}
                <a href="#" className="text-blue-600 underline">Plan & Pricing details, disclosures, Coverage Alerts</a>. By clicking yes, you authorize Ticketmaster to send your name, address, and credit card information to AGA Service Company, who will charge your card $46.00 on the terms described above.
            </p>

            <div className="space-y-3">
                <div className="border border-purple-600 rounded-xl p-3 flex items-start space-x-3 bg-purple-50">
                    <input type="radio" name="insurance" id="yes" className="mt-1" />
                    <label htmlFor="yes" className="text-sm text-gray-800">
                        <span className="block text-xs text-white bg-purple-600 px-2 py-0.5 rounded mb-1 inline-block">HIGHLY RECOMMENDED</span>
                        Yes, protect my resale ticket purchase to Kendrick Lamar at MetLife Stadium.
                    </label>
                </div>

                <div className="border border-gray-300 rounded-xl p-3 flex items-start space-x-3">
                    <input type="radio" name="insurance" id="no" className="mt-1" />
                    <label htmlFor="no" className="text-sm text-gray-800">
                        No, do not protect my resale ticket purchase. I understand this decision may put my <strong>$501.37</strong> purchase at risk.
                    </label>
                </div>

                <div>
                    <p className="text-sm font-semibold">
                        49,933 people protected their tickets in the last 3 days
                    </p>
                </div>
            </div>
        </div>
    );
}
