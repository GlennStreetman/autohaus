import Image from "next/image";
import  {teamMember} from "../strapiAPI/getTeam"


const imgContent = "p-2 col-span-12 md:col-span-12 lg:col-span-10 flex items-center "; //2x
const imgBox = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-72 md:w-72 lg:h-72 lg:w-72 xl:h-80 xl:w-80 float-left m-2 ";

interface props {
    team: teamMember[]
}

function Team(p: props) {

    return (
        <div className="w-full flex justify-center bg-primaryDark p-4">
        <div className="flex flex-col">
            <div className="flex justify-center text-white font-bold text-3xl relative">
                <div className="z-10 bg-primaryDark px-2 text-center">Meet the team!</div>
                <div className="absolute left-20 right-20 h-0 border-y-2 top-1/2" />
            </div>
            <div className={imgContent}>
            {p?.team?.[0]?.photoUrl? 
            <a href='/about' className={imgBox}>
                    <Image alt="whyImage" src={`${p.team[0].photoUrl}`} layout="fill" objectFit="fill" />
                </a>
            : <></>    
            } 
            {p?.team?.[1]?.photoUrl ? 
                <a href='/about' className={imgBox}>
                    <Image alt="whyImage" src={`${p.team[1].photoUrl}`} layout="fill" objectFit="fill" />
                </a>
                : <></>
            }
        </div>
        </div>
    </div>
    );
}

export default Team;



