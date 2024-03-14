import React, { useCallback } from "react";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FaTwitter } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";
import { PiHashBold } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { FaBookBookmark } from "react-icons/fa6";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";


import FeedCard from "@/components/FeedCard";





interface TwitterSidebarButton {
  title : string
  icon : React.ReactNode;  // bec an icon is react node 
}

const sidebarMenuItems: TwitterSidebarButton [] = [
  {

  title:'Home',
  icon: <MdAddHome />,
},

{

  title:'Explore',
  icon: <PiHashBold />,
},

{

  title:'Notification',
  icon: <IoIosNotifications />,
},


{

  title:'Messages',
  icon: <TiMessages />,
},

{

  title:'Bookmarks',
  icon: <FaBookBookmark />,
},

{

  title:'Twitter Blue', // its for payment or for verification 
  icon: <TiSocialTwitterCircular />,
},

{

  title:'Profile',
  icon: <CgProfile />,
},

{

  title:'More',
  icon:<CiCircleMore />,
},

] 


export default function Home() {

const handleLoginWithGoogle = useCallback((cred: CredentialResponse) => {},[])

  return (
    <div >
        <div className=" grid grid-cols-12 h-screen w-screen  px-56 " >
          <div className=" col-span-3   pt-1 px-4  "   >
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all" >
          <FaTwitter />  
          </div>
          <div className="mt-1 text-1xl  ">
            <ul>
            {sidebarMenuItems.map(item => (
            <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-1 w-fit cursor- mt-1" 
            key={item.title}> <span className="text-2xl">{ item.icon}</span> <span>{ item.title}</span>
            </li>))}
            </ul>
            <div className="  mt-4 px-3 font-semibold ">
            <button className="bg-[#1d9bf0] rounded-full w-full  text-lg py-1 px-2  ">
              Tweet
              </button>
            </div>
          </div> 
          </div>
          <div className="col-span-6 border-r-[0.2px] border-l-[1px] h-screen overflow-auto border-gray-900 " >
 
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
         </div>
          <div className="col-span-3 p-5">
            <div className=" p-5 bg-slate-900 rounded-lg  ">
              <h1 className=" my-4  text-1xl ml-7 ">New to Twitter</h1>
          <GoogleLogin onSuccess={(cred) => console.log(cred)} />
          </div>
          </div>
    </div>
    </div>
       
  )
}