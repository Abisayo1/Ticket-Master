import { motion } from "framer-motion";
import GameScheduleCards from './component/GameScheduleCards'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "./component/TicketDesigns";



const BarcodeTickets = () => {

   const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(-1); // Go back to previous page after animation
    }, 300); // match the animation duration
  };

  return (
    <div className="relative bg-[#0b1b3c] min-h-screen w-full">
     <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100vh", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative bg-[#0b1b3c] h-full w-full"
    
    >

    
   <div className={`relative ${isExiting ? "animate-slide-down-exit" : ""}`}>
      <GameScheduleCards onClose={handleClose} />
      <Ticket/>
      
    </div>

    </motion.div>
    </div>
  )
  
}

export default BarcodeTickets
