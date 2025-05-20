"use client";

import Searchbar from "@/components/Searchbar/Searchbar";
import EventList from "@/components/Events/EventList";

const Home = () => {
  return (
    <div className="">
      <Searchbar />
      <div className="container mx-auto">
        <EventList />
      </div>
    </div>
  )
};

export default Home;