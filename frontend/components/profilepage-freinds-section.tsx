import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ProfilePageFriendsSection = ({
  friendsDetails,
}: {
  friendsDetails: {
    id: string;
    last_name: string;
    first_name: string;
    profile_picture_url: string;
  };
}) => {
  return (
    <>
      <span className="font-medium">10 Friends</span>
      <div className="flex gap-x-2 ">
        {Array.from({ length: 7 }).map((item, i) => (
          <Avatar className="size-8" key={i}>
            <AvatarImage src={friendsDetails.profile_picture_url} />
          </Avatar>
        ))}
      </div>
    </>
  );
};

export default ProfilePageFriendsSection;
