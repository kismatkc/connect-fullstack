import React from "react";
import CreatePostDialog from "./create-post-dialog";

const CreatePost = () => {
  return (
    <section className="border-light mt-6 border-dark dark:container-bg-dark container-bg-light flex flex-col p-2 ">
      <div className="flex gap-x-2 p-2.5 border-b-[1px] ">
        <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>
        {/* <input
          className="w-full border rounded-3xl py-2 px-4 
                         focus:outline-none 
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200 bg-icon-bg-light dark:bg-icon-bg-dark mr-3"
          placeholder="What's on your mind, username?"
        /> */}
        <CreatePostDialog />
        
      </div>
      {/* <div className="flex justify-around p-2.5">
        <button>
          <figure className="flex gap-x-1">
            <img src="/header/video-icon.png" className="size-6" />
            <figcaption>Live video</figcaption>
          </figure>
        </button>
        <button>
          <figure className="flex gap-x-1">
            <img src="/header/photo-video.png" className="size-6" />
            <figcaption>Photo/video</figcaption>
          </figure>
        </button>
      </div> */}
    </section>
  );
};

export default CreatePost;
