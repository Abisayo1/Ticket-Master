import React from 'react'
import HeaderCheckout from './HeaderCheckout'
import HeaderDesktop from './HeaderDesktop'
import ChSection1 from './ChSection1'
import TicketInsurance from './TicketInsurance'
import TicketOrder from './TicketOrder'
import TicketOrderDesktop from './TicketOrderDesktop'
import DesktopPayment from './DesktopPayment'
import DesktopTicketInsurance from './DesktopTicketInsurance'
import DesktopTicketOrder from './DesktopTicketOrder'
import ConcertTicket from './ConcertTicket'

const Checkout = () => {
  return (
    <div>
      {/* Header Section */ }
        <HeaderCheckout/>
        <HeaderDesktop />

        {/* Payment Section */ }
        <ChSection1/>
        <DesktopPayment/>

        {/* Ticket Insurance */ }
        <TicketInsurance/>
        <DesktopTicketInsurance />

        {/* Ticket Order */ }
        <TicketOrder/>
        <DesktopTicketOrder />
        <ConcertTicket />

    </div>
  )
}

export default Checkout