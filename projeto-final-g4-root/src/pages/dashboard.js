import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar/NavBar";
import CourseCardDash from "@/components/DashBoard.js/CourseCardDash";
import withAuth from "@/components/Auth/withAuth";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [careerSuggestions, setCareerSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUserName(data.userName);
        setCareerSuggestions(data.careerSuggestions);
      } catch (error) {
        console.error("Error fetching career suggestions:", error);
      }
    };

    fetchData();
  }, []);

  const firstCareer = careerSuggestions[0];
  const secondCareer = careerSuggestions[1];
  const thirdCareer = careerSuggestions[2];
  const fourthCareer = careerSuggestions[3];
  const ffifthCareer = careerSuggestions[4];

  return (
    <div className="text-white bg-slate-950 p-6">
      <div className="flex justify-between mt-8 ">
        <div className="">
          <h1 className="text-3xl font-semibold mb-4">Hi, {userName}</h1>
          <h2>Find your new career</h2>
        </div>

        <div className="h-20">
          <img src="/img-profile.png" alt="profile" className="mb-6" />
        </div>
      </div>

      <div>
        <div class=" flex items-center w-full ">
          <input
            type="text"
            class="bg-zinc-800 p-2 my-2 mt-2 rounded-3xl flex-grow focus:outline-none"
            placeholder="Search..."
          />{" "}
        </div>

        <p className="mb-4 mt-5">This career is an 80% match for you.</p>
      </div>

      <div className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-xl px-4 py-4 flex flex-row items-center justify-center h-40">



        <div className="flex flex-row items-center p-2">

        <div className="mx-4">
          <h3 className="text-4xl font-semibold mb-2"> {firstCareer && firstCareer.careerName}</h3>

          <button>call to action</button>
        </div>
        
        <div className="">
          <img src="/img-career.png" alt="profile" className="" />
        </div>
      </div>

</div>



      <div className="mt-5">
        <p className="font-medium text-xl">Careers that might interest you</p>
        <div
          className="flex items-center
   text-xl gap-2 mt-3 overflow-x-scroll	"
        >
          <div className="bg-purple-800 rounded-2xl w-auto h-14">
            {secondCareer && secondCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl w-auto h-14">
            {thirdCareer && thirdCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl w-auto h-14">
            {fourthCareer && fourthCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl w-auto h-14">
            {ffifthCareer && ffifthCareer.careerName}
          </div>
        </div>
      </div>

      <div>
        <p>Popular courses</p>
        <div>
          <div className="text-4xl flex">
            {firstCareer && <CourseCardDash career={firstCareer} />}
            {secondCareer && <CourseCardDash career={secondCareer} />}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p>Your streak</p>
      </div>

      <div className="mt-10 my-10">
        <p>Desafios</p>
      </div>
      <NavBar />
    </div>
  );
}

export default withAuth(Dashboard);