import Image from "next/image"
const UserProfile = ({ params }: { params: { id: number } }) => {
  return <section className="flex flex-col">
  <div className="flex flex-col">
  <div className="">
  <Image src={"/"} alt="profile picture" width={100} height={100}/>
  
  </div>
  <div></div>
  </div>
  <div></div>
  
  </section>
};

export default UserProfile;
