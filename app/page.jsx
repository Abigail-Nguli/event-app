"use client";

// import { hydrateRoot } from "react-dom/client";
// hydrateRoot(document.getElementById("root"), <event-app />);
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

// components
import Hero from "@/components/Hero";
import EventList from "@/components/Events/EventList";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecommendedEvents from "@/components/RecommendedEvents";
import DownloadApp from "@/components/DownloadApp";

const Home = () => {
  const { showEventList } = useContext(EventContext);
  console.log(showEventList);
  return (
    <div className="">
      <Hero />
      <div className="flex flex-col justify-center items-center"></div>
      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="">
            {/* upcoming events slider */}
            <UpcomingEvents />
            {/* download app section */}
            <DownloadApp />
            {/* recommended events slider */}
            <RecommendedEvents />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
