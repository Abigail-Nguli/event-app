"use client";
import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [event, setEvent] = useState(null); // state to store the event date
  const [seat, setSeat] = useState({ seat: null, price: null }); //state to store the selected seats
  const [showMenu, setShowMenu] = useState(false); // state to manage menu visibilty
  const [itemAmount, setItemAmount] = useState(1); // state to track item quantity
  const [totalPrice, setTtotalPrice] = useState(0); // state to store total price
  const [checkoutData, setCheckoutData] = useState(null); // state to store the checkout data

  const intializeEvent = (fetchedEvent) => {
    setEvent(fetchedEvent);

    // reset item amount when a new event is initialized
    setItemAmount(1);
    // initialize the front seat if it exists in the featched event data
    const frontseat = fetchedEvent?.seats.find(
      (seat) => seat.seat === "frontseat"
    );
    if (frontseat) {
      setSeat({ seat: frontseat.seat, price: frontseat.price });
    }
  };

  //  effect to handle click outside os the menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-select")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  //   calculate total price whenever the seat price or item changes
  useEffect(() => {
    setTtotalPrice(seat.price * itemAmount);
  }, [seat.price, itemAmount]);

  // function to handle the seat selection
  const handleSeat = (seat, price) => {
    setSeat({ seat, price });
    setShowMenu(false);
  };

  // function to handle " buy now "
  const buyNow = (event) => {
    const ticketData = {
      eventId: event.id,
      eventNam: event.title,
      ticketType: seat.seat,
      ticketPrice: seat.price,
      amount: itemAmount,
      totalPrice,
    };

    setCheckoutData(ticketData);
  };

  //   increase and decrease ticket quantity
  const increaseAmount = () => {
    setItemAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setItemAmount((prevAmount) => ( prevAmount > 1 ? prevAmount - 1 : 1));
  };

  return (
    <TicketContext.Provider
      value={{
        event,
        seat,
        showMenu,
        itemAmount,
        totalPrice,
        checkoutData,
        handleSeat,
        setSeat,
        setShowMenu,
        buyNow,
        intializeEvent,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
