"use client";
import { TicketContext } from "@/contexts/TicketContext";
import { useContext, useEffect, useState } from "react";

import { BiPlus, BiMinus } from "react-icons/bi";
import { HiTicket } from "react-icons/hi2";

const BuyTicket = ({ event }) => {
  const { buyNow, itemAmount, totalPrice, increaseAmount, decreaseAmount } = useContext(TicketContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = () => {
    setIsLoading(true); // show loader
    buyNow(event) // trigger the buyNow logic
    setTimeout(() => {
        setIsLoading(false);
    }, 1000); 
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gp-4">
      {/* increase, amount, decrease */}
      <div
        className="w-[200px] md:w-[300px] flex items-center justify-between
      bg-secondary p-2 rounded-full"
      >
        {/* decrease */}
        <div
          onClick={() => decreaseAmount()}
          className="cursor-pointer bg-accent w-[48px] h-[48px]  flex 
          items-center justify-center select-none rounded-full"
        >
          <BiMinus className="text-lg" />
        </div>
        {/* amount */}
        <div className="">{itemAmount}</div>
        {/* increase */}
        <div
          onClick={() => increaseAmount()}
          className="cursor-pointer bg-accent w-[48px] h-[48px]  flex 
          items-center justify-center select-none rounded-full"
        >
          <BiPlus className="text-lg" />
        </div>
      </div>
      {/* buy now btn */}
      <button
        onClick={handleBuyNow}
        className="bg-accent hover:bg-accent-hover transition-all p-4
      rounded-full w-full"
      >
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div>Processing...</div>
          ) : (
            <div className="flex items-center gap-4">
              <HiTicket className="text-2xl" />
              <div>{`${itemAmount} x ticket - ${totalPrice}`}</div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default BuyTicket;
