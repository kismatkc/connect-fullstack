import CreatePost from "@/components/create-post";
import Header from "@/components/Header";
import Messenger from "@/components/messenger";
import MessengerChatBox from "@/components/messenger-chat-box";
import Posts from "@/components/posts";
import StoryCarousal from "@/components/story-carousal";

const Home = ({}) => {
  return (
    <>
      {/* <Header /> */}

      <CreatePost />
      <StoryCarousal />
      <Posts />
      <Posts />
      <Posts />
      <Posts />

    </>
  );
};

export default Home;
