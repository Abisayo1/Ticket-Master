import React from 'react'
import TicketDisplay from './TicketDisplay'
import TicketHeader from './TicketHeader'
import ActionButtons from './ActionButtons'

const EmailTicket = () => {
  return (
    <div>
        <TicketHeader/>
      <TicketDisplay/>
      <ActionButtons/>
    </div>
  )
}

export default EmailTicket
