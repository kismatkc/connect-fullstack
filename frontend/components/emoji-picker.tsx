import EmojiPicker from "emoji-picker-react";
import { SmileIcon } from "lucide-react";
import { useState } from "react";
const Emojis = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="[&>svg]:stroke-[1.5px] dark:[&>svg]:stroke-[1px] [&>svg]:stroke-gray-700 dark:[&>svg]:stroke-white relative ">
            <EmojiPicker open={open} reactionsDefaultOpen/>
            
       
            <SmileIcon className="cursor-pointer " onClick={()=> setOpen(!open)}/>
     
        </div>
    );
};

export default Emojis;
