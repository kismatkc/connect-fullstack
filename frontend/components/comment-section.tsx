import {
  Ellipsis,
  Image,
  Laugh,
  MessageCircle,
  Send,
  Share,
  Smile,
  SmileIcon,
  ThumbsUp,
} from "lucide-react";
import Like from "./like";

const CommentSection = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  return (
    <div className="flex flex-col w-full mt-2 icon-bg-light dark:icon-bg-dark">
      <div className="flex justify-between border-b-2 pb-3">
        <Like postId={postId} userId={userId} />
        <div className="flex gap-x-1 ">
          <figure className="flex">
            <figcaption>1.3K</figcaption>
            <MessageCircle />
          </figure>
          <Share />
        </div>
      </div>
      <div className="flex flex-col pt-2">
        <span className="text-base">View more comments</span>
        <figure className="flex gap-x-2 items-center pt-3">
          <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>

          <figcaption className="flex flex-col px-4 py-1 rounded-full  bg-icon-bg-light dark:bg-icon-bg-dark">
            <span>Nischal adhikari</span>
            <span> it is</span>
          </figcaption>
          <Ellipsis className="size-6 opacity-50 cursor-pointer" />
        </figure>
        <div className="flex gap-x-2 pt-4">
          <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>
          <div className="w-full relative">
            <textarea
              className="w-full border rounded-3xl py-3 px-4 
                         focus:outline-none 
                         min-h-[72px]
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200 bg-icon-bg-light dark:bg-icon-bg-dark mr-3"
              placeholder="Comment as kismat kc"
            />
            <div className="flex gap-x-1 absolute left-4 bottom-[4%]  [&>svg]:stroke-[1.5px] dark:[&>svg]:stroke-[1px] [&>svg]:stroke-gray-700 dark:[&>svg]:stroke-white">
              <SmileIcon className="cursor-pointer" />
              <Image className="cursor-pointer" />
            </div>
            <Send className="absolute bottom-[4%] right-3 stroke-[1.5px] dark:stroke-[1px] stroke-gray-700 dark:stroke-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
