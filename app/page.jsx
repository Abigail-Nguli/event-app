"use client";

// import { hydrateRoot } from "react-dom/client";
// hydrateRoot(document.getElementById("root"), <event-app />);

import Searchbar from "@/components/Searchbar/Searchbar";
import EventList from "@/components/Events/EventList";
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);
  console.log(showEventList);
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <Searchbar />
        {/* clear search */}
        <button className="text-accent" onClick={() => handleClearSearch()}>
          clear search
        </button>
      </div>
      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="">
            {/* upcoming events slider */}
            <div className="">upcoming events slider</div>
            {/* download app section */}
            <div className="">download app section</div>
            {/* recommended events slider */}
            <div className="">recommended events slider</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;