import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessengerExistingMessages = () => {
  return (
    <section className="flex flex-col p-3">
      {Array.from({ length: 10 }).map(() => (
        <div className= "flex items-center p-3">
          <Avatar className='mr-4'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-[600] text-sm'>Mohan kc</span>
            <span className='text-xs'>Nameste baba</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MessengerExistingMessages