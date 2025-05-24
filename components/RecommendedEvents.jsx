"use client";
import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

// components
import Event from "./Events/Event";
import Link from "next/link";
import SkeletonGrid from "./SkeletonGrid";

const RecommendedEvents = () => {
  const { events } = useContext(EventContext);

  const filterRecommendedEvents = events.filter(
    (event) => event.recommended === true
  );

  return (
    <section className="mb-32 ">
      <div className="mb-12 text-center">
        <h3 className="pretitle">Recommended for you</h3>
        <h2 className="h2">Events you might like</h2>
      </div>
      {filterRecommendedEvents.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1310: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
          className="w-full h-[500px]"
        >
          {filterRecommendedEvents.map((event, index) => (
            <SwiperSlide key={index} className="section-none">
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

export default RecommendedEvents;
