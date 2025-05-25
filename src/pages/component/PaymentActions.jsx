// components/PaymentActions.jsx
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PaymentActions = ({ loading, onChangePaymentMethod, onCancelPayment }) => {
  const navigate = useNavigate();

  const handleShowAccountNumber = () => {
    navigate(-1); // this goes back to the previous page
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-4 mb-11 -mt-11 w-full max-w-md">
        <button
          onClick={onChangePaymentMethod}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100"
          disabled={loading}
        >
          <PencilSquareIcon className="h-5 w-5" />
          Change Payment Method
        </button>
        <button
          onClick={onCancelPayment}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100"
          disabled={loading}
        >
          <XMarkIcon className="h-5 w-5" />
          Cancel Payment
        </button>
    
      </div>
    </div>
  );
};

export default PaymentActions;
