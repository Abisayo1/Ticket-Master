import React from 'react'
import TicketmasterPayment from './TicketmasterPayment'
import Body from './ZellePayment'
import SecuredByTicketmaster from './component/SecuredByTicketmaster'

const PaymentPage = () => {
  return (
    <div>
      <TicketmasterPayment/>
      <Body />
      <SecuredByTicketmaster />
    </div>
  )
}

export default PaymentPage
