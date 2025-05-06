import React from 'react'
import HeaderCheckout from './HeaderCheckout'
import HeaderDesktop from './HeaderDesktop'
import ChSection1 from './ChSection1'
import TicketInsurance from './TicketInsurance'
import TicketOrder from './TicketOrder'
import TicketOrderDesktop from './TicketOrderDesktop'

const Checkout = () => {
  return (
    <div>
      {/* Header Section */ }
        <HeaderCheckout/>
        <HeaderDesktop />

        {/* Payment Section */ }
        <ChSection1/>

        {/* Ticket Insurance */ }
        <TicketInsurance/>

        {/* Ticket Order */ }
        <TicketOrder/>
        <TicketOrderDesktop />

    </div>
  )
}

export default Checkout