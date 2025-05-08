import React, { useState } from 'react';
import HeaderCheckout from './HeaderCheckout';
import HeaderDesktop from './HeaderDesktop';
import ChSection1 from './ChSection1';
import TicketInsurance from './TicketInsurance';
import TicketOrder from './TicketOrder';
import TicketOrderDesktop from './TicketOrderDesktop';
import DesktopPayment from './DesktopPayment';
import DesktopTicketInsurance from './DesktopTicketInsurance';
import DesktopTicketOrder from './DesktopTicketOrder';
import ConcertTicket from './ConcertTicket';
import Summary from './Summary'; // Assuming you forgot to import it

const Checkout = () => {
  const [insuranceSelected, setInsuranceSelected] = useState(null); // <-- Add this line

  return (
    <div>
      {/* Header Section */}
      <HeaderCheckout />
      <HeaderDesktop />

      {/* Payment Section */}
      <ChSection1 />
      <DesktopPayment />

      {/* Ticket Insurance */}
      <TicketInsurance onInsuranceChange={setInsuranceSelected} />
      <Summary insuranceSelected={insuranceSelected} />

        <DesktopTicketInsurance onInsuranceChange={setInsuranceSelected} />
      <Summary insuranceSelected={insuranceSelected} />

      {/* Ticket Order */}
      <TicketOrder insuranceSelected={insuranceSelected} />
      <DesktopTicketOrder insuranceSelected={insuranceSelected} />
      <ConcertTicket />
    </div>
  );
};

export default Checkout;
