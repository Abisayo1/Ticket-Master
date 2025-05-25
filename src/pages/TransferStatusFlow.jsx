import React from 'react'
import TransferStatus from './component/TransferStatus'
import TicketmasterPayment from './TicketmasterPayment'
import SecuredByTicketmaster from './component/SecuredByTicketmaster'
import PaymentActions from './component/PaymentActions'


const TransferStatusFlow = () => {
  return (
    <div>
          <TicketmasterPayment/>
          <TransferStatus />
          <PaymentActions/>
          <SecuredByTicketmaster />
        </div>
  )
}

export default TransferStatusFlow