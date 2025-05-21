"use client";
import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //   applied filters after submit
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
  });

  // filtered events based on the applied filters
  const filteredEvents = useMemo(() => {
    if (appliedFilters === null) return []; // No results until first submission
    return events.filter((event) => {
      // check search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      return matchesSearch;
    });
  }, [events, appliedFilters]);

  //   fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      // start loader
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
        // stop loader
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        // stop loader
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    setAppliedFilters({ searchTerm });
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        searchTerm,
        isLoading,
        error,
        setSearchTerm,
        filteredEvents,
        handleSubmit,
        handleClearSearch,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;