import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

import SkeletonGrid from "../SkeletonGrid";
import Event from "./Event";
import Link from "next/link";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error: {error}</p>;

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div className="h-[80vh]">
        <p className="text-white/80 text-center">No events available</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid itemCount={12} />;
  } else {
    return (
      <div className="">
        <h4 className="h4 mb-6">{filteredEvents.length} results found</h4>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32">
          {filteredEvents.map((event, index) => {
            return (
              <div key={index} className="">
                {/* event */}
                <Link href={`/event/${event.id}`}>
                  <Event event={event} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default EventList;
