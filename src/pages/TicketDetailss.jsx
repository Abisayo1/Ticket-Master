import { motion } from "framer-motion";
import GameScheduleCards from './component/GameScheduleCards'
import TicketCards from './component/TicketCards'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const TicketDetailss = () => {

   const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(-1); // Go back to previous page after animation
    }, 300); // match the animation duration
  };

  return (
     <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100vh", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative"
    >

    
   <div className={`relative ${isExiting ? "animate-slide-down-exit" : ""}`}>
      <GameScheduleCards onClose={handleClose} />
      <TicketCards />
    </div>

    </motion.div>
  )
}

export default TicketDetailss
