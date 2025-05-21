import Image from "next/image";
import {BiCalendar, BiTime, BiMap} from "react-icons/bi"

const Event = ({event}) => {
  return (
    <div
      className="bg-white/5 hover:bg-white/10 transition-all h-[440px]
    rounded-3xl flex flex-col justify-start p-4 w-[320px] sm:w-full 
    mx-auto sm:mx-0"
    >
      <div className="relative w-full h-[320px] mb-10">
        <Image
          src={event.img_sm}
          fill
          alt=""
          quality={100}
          className="rounded-2xl
      object-cover"
        />
        <diiv className="absolute -bottom-[24px] left-4 bg-accent w-[110px] h-[48px] 
        text-[13px] uppercase font-medium rounded-full flex items-center justify-center">
          {event.type}
        </diiv>
      </div> 
      {event.title}
    </div>
  );
};

export default Event;
