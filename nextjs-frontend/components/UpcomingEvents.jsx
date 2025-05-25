"use client";

import React, { useContext, useEffect, useState } from "react";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { EventContext } from "@/contexts/EventContext";

// components
import Event from "./Events/Event";
import Link from "next/link";
import Image from "next/image";
import SkeletonGrid from "./SkeletonGrid";

const UpcomingEvents = () => {
  const { events } = useContext(EventContext);
  const [eventValue, setEventValue] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filterEvents = () => {
      if (eventValue === "all") {
        setFilteredEvents(events);
      } else {
        const result = events.filter((event) => event.type === eventValue);
        setFilteredEvents(result);
      }
    };

    filterEvents();
  }, [eventValue, events]);
  return (
    <section className="mb-16">
      <div className="mb-12 text-center">
        <h3 className="pretitle">Upcoming</h3>
        <h2 className="h2">Popular Events</h2>
      </div>
      <div
        className="flex flex-col xl:flex-row items-center justify-between 
      mb-12"
      >
        <Tabs
          value={eventValue}
          onValueChange={setEventValue}
          className="bg-none w-full max-w-[600px] h-full flex justify-center 
        items-center mb-12 xl:mb-0"
        >
          <TabsList
            className="flex flex-col lg:flex-row gap-6 
          bg-transparent w-full h-full"
          >
            <TabsTrigger value="all">All </TabsTrigger>
            <TabsTrigger value="sport">
              <Image
                src={"/assets/upcoming/sport.svg"}
                width={18}
                height={18}
                alt=""
              />
              Sport
            </TabsTrigger>
            <TabsTrigger value="music">
              <Image
                src={"/assets/upcoming/music.svg"}
                width={18}
                height={18}
                alt=""
              />
              Music
            </TabsTrigger>
            <TabsTrigger value="food">
              <Image
                src={"/assets/upcoming/food.svg"}
                width={18}
                height={18}
                alt=""
              />
              Food
            </TabsTrigger>
            <TabsTrigger value="art">
              <Image
                src={"/assets/upcoming/art.svg"}
                width={18}
                height={18}
                alt=""
              />
              Art
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Link
          href={""}
          className="uppercase border-b-2 border-accent text-sm
        font-semi-bold text-accent"
        >
          See all events
        </Link>
      </div>
      {/* slider */}
      {filteredEvents.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
            clickable: true
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1310: { slidesPerView: 4 },
          }}
          modules={[ Pagination ]}
          className="w-full h-[500px]"
        >
          {filteredEvents.map((event, index) => (
            <SwiperSlide key={index} className="select-none">
              <Link href={`/event/${event.id}`}>
                <Event event={event} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <SkeletonGrid itemCount={4} />
      )}
    </section>
  );
};

export default UpcomingEvents;
