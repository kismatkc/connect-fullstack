import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessengerExistingMessages = () => {
  const [overflowing,setOverflowing] = useState(false)
  const messegesRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{

   const scroll = setTimeout(() => {
      
    }, 100);
if(messegesRef.current){
  messegesRef.current.scrollHeight > messegesRef.current.clientHeight && (setOverflowing(true))

}
  },[overflowing])


  return (
    <section
      className="flex flex-col p-3  h-full overflow-y-auto scroll-smooth"
      ref={messegesRef}
     
    >
      <div className="flex flex-col ">
        {Array.from({ length: 50 }).map((_, index) => (
          <div className="flex items-center p-3" key={index}>
            <Avatar className="mr-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-[600] text-sm">Mohan kc</span>
              <span className="text-xs">Nameste baba</span>
            </div>
          </div>
        ))}
      </div>

      {!overflowing && (
        <div className="flex justify-center items-center mt-12">
          No more messages
        </div>
      )}
    </section>
  );
}

export default MessengerExistingMessages
