"use client";
import React, {createContext, useEffect, useState, useMemo} 
from "react";

export default EventContext = createContext();

const EventProvider = ({children}) => {
    const [events, setEvents] =useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            // start loader
            setIsLoading(true);
            try {
                const res = await fetchEvents("")
            }catch (err) {
                setError(err.message);
                setIsLoading(false)
            }
        }
    })
  return (
    <EventContext.Provider value={""}>
        {children}
    </EventContext.Provider>
  )
}