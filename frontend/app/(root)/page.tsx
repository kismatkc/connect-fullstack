import CreatePost from "@/components/create-post";
import Header from "@/components/Header";
import Messenger from "@/components/messenger";
import Posts from "@/components/posts";
import StoryCarousal from "@/components/story-carousal";

const Home = ({}) => {
  return (
    <>
      <Messenger />

      <Header />
      <CreatePost />
      <StoryCarousal />
      <Posts />
      <Posts />
      <Posts />
    </>
  );
};

export default Home;
