"use client";
import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventList, setShowEventList] = useState(false);

  // current filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  //   applied filters after submit
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
    selectedDate: null,
    selectedType,
  });

  // filtered events based on the applied filters
  const filteredEvents = useMemo(() => {
    const today = new Date();
    return events.filter((event) => {
      // check event date (exclude past events)
      const eventDate = new Date(event.date);
      if (eventDate < today) return false;

      // check search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      // check location
      const matchesLocation = appliedFilters.selectedLocation
        ? event.location.toLowerCase() ===
          appliedFilters.selectedLocation.toLowerCase()
        : true;

      // check date
      const matchesDate = appliedFilters.selectedDate
        ? eventDate.toDateString() ===
          new Date(appliedFilters.selectedDate).toDateString()
        : true;

      // check type
      const matchesType = appliedFilters.selectedType
        ? event.type.toLowerCase() ===
          appliedFilters.selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesLocation && matchesDate && matchesType;
    });
  }, [events, appliedFilters]);

  //   fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      // start loader
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://event-details-data.onrender.com/events"
        );
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
    setShowEventList(true);
    setAppliedFilters({
      searchTerm,
      selectedLocation,
      selectedDate,
      selectedType,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm(""),
    setShowEventList(false);
    setSelectedLocation("");
    setSelectedDate(null);
    setSelectedType("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // format options
    const options = {weekday: "short", month: "short", day: "numeric"};

    // return formatted date
    return date.toLocaleDateString("en-Us", options);
  }

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
        showEventList,
        selectedLocation,
        setSelectedLocation,
        selectedDate,
        setSelectedDate,
        selectedType,
        setSelectedType,
        formatDate,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
