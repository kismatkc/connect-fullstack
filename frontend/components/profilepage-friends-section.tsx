import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
const ProfilePageFriendsSection = ({
  friendsDetails,
}: {
  friendsDetails: {
    id: string;
    last_name: string;
    first_name: string;
    profile_picture_url: string;
  }[];
}) => {
  return (
    <>
      <span className="font-medium">
        {friendsDetails.length === 0
          ? "No friends"
          : `${friendsDetails.length} ${friendsDetails.length > 1 ? "Friends" : "Friend"}`
        
        }
      </span>
      <div className="flex gap-x-2 ">
        {friendsDetails.slice(0,7).map((item) => (
          <Link href={`/${item.id}`}>
            <Avatar className="size-8" key={item.id}>
              <AvatarImage src={item.profile_picture_url} />
            </Avatar>
          </Link>
        ))}
      </div>
    </>
    // <>
    //   <span className="font-medium">{`${friendsDetails.length} ${friendsDetails.length > 1 ? "Friends" : "Friend" }`}</span>
    //   <div className="flex gap-x-2 ">
    //     {friendsDetails.map((item) => (
    //       <Avatar className="size-8" key={item.id}>
    //         <AvatarImage src={item.profile_picture_url} />
    //       </Avatar>
    //     ))}
    //   </div>
    // </>
  );
};

export default ProfilePageFriendsSection;
