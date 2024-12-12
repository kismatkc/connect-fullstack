import CreatePost from "@/components/create-post";

import Posts from "@/components/posts";
import StoryCarousal from "@/components/story-carousal";

const Home = () => {
  return (
    <>
      <CreatePost />
      <StoryCarousal />
      <Posts />
    </>
  );
};

export default Home;
