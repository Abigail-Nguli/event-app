import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

import SkeletonGrid from "../SkeletonGrid";
import Event from "./Event";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error: {error}</p>;

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div className="">
        <p>No events available</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid itemCount={12} />;
  } else {
    return (
      <div className="">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32">
          {filteredEvents.map((event, index) => {
            return (
              <div key={index} className="">
                {/* event */}
                <Event event={event} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default EventList;
