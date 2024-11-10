import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Minus, Phone, Video, X } from 'lucide-react';

const MessengerChatBox = () => {
  return (
    <section className="flex flex-col  container-bg-light container-bg-dark absolute z-[500] w-[338px] h-[455px] bottom-0 left-[10%]">
      <div className="flex justify-between">
        <figure className='flex items-center'>
          <Avatar className="mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <figcaption>Kismat kc</figcaption>
        </figure>

        <div className='flex gap-x-2 items-center'>
            <Phone  size={21} fill=''/>
            <Video size={21}/>
            <Minus size={21}/>
            <X size={21}/>

        </div>
      </div>
      <div className="grow"></div>
      <div></div>
    </section>
  );
}

export default MessengerChatBox