import React  from "react";
import Image from "next/image";

import { MdMessage, MdOutlineCloudUpload } from "react-icons/md";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const FeedCard: React.FC = () => {
    return <div className=" border border-gray-600 border-t-1 border-b-0 border-r-0 border-l-0 p-5 hover:bg-slate-950  transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3 ">
            <div className="col-span-2">
                <Image src="https://avatars.githubusercontent.com/u/91730407?v=4" alt="user-image" 
                height={50} 
                width={50} />
            </div>
            <div className="col-span-10 ">
                <h5>Rupesh sahu</h5>
                <p >budheuuewhdewinduwediewvdweugdugweudweb bugduwegduywg</p>
                <div className="flex justify-between mt-5 text-xl1 items-center  pr-3  w[-90%]">
                    <div>
                    <MdMessage />
                    </div>
                    <div>
                    <FaRetweet />
                    </div>
                    <div>
                    <CiHeart />
                    </div>
                    <div>
                    <MdOutlineCloudUpload />
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default FeedCard