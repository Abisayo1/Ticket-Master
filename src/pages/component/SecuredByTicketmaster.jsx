import { Lock } from 'lucide-react';

export default function SecuredByTicketmaster() {
  return (
    <div className="flex mt-7 mb-4 items-center justify-center">
      <div className="flex items-center space-x-2 text-sm">
        <Lock className="w-4 h-4 text-black" />
        <span className="text-gray-700">
          Secured by <span className="font-semibold text-black">Ticketmaster</span>
        </span>
      </div>
    </div>
  );
}
