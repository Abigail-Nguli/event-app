"use client";

import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { BiCalendar, BiChevronDown } from "react-icons/bi";

import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

const EventDate = () => {
  const { selectedDate, setSelectedDate } = useContext(EventContext);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="flex items-center gap-[10px] w-full xl:w-[190px]">
      <div className="text-lg text-accent">
        <BiCalendar />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start p-0 bg-transparent
          hover:bg-transparent">
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-secondary border-0 text-white">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
        <div className="text-[24px]">
            <BiChevronDown />
        </div>
      </Popover>
    </div>
  );
};

export default EventDate;
