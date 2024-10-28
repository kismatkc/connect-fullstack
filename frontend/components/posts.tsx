import { Ellipsis, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import CommentSection from "./comment-section";

const Posts = () => {
  return (
    <Card className="flex flex-col icon-bg-light dark:icon-bg-dark dark:container-bg-dark container-bg-light mb-4">
      <CardHeader className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <figure className="flex gap-x-2 items-center">
            <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>

            <figcaption className="flex flex-col">
              <span>Kismat kc</span>
              <span>3h ago</span>
            </figcaption>
          </figure>
          <div className="flex items-center">
            <Ellipsis />
            <X />
          </div>
        </div>
        <span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, in
        </span>
      </CardHeader>
      <CardContent className="relative max-w-[500px] aspect-square object-contain">
        <Image
          src="/posts/post_1.jpg"
          fill
          alt="replace with usename name and post"
          priority
        />
      </CardContent>
      <CardFooter>
        <CommentSection />
      </CardFooter>
    </Card>
  );
};

export default Posts;
