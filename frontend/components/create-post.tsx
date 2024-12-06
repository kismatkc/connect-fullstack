import React from "react";
import CreatePostDialog from "./create-post-dialog";

const CreatePost = () => {
  return (
    <section className="border-light mt-6 border-dark dark:container-bg-dark container-bg-light flex flex-col p-2 ">
      <div className="flex gap-x-2 p-2.5 border-b-[1px] ">
        <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>

        <CreatePostDialog />
      </div>
    </section>
  );
};

export default CreatePost;
