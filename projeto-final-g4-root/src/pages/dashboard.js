import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar/NavBar";
import CourseCardDash from "@/components/DashBoard.js/CourseCardDash";
import withAuth from "@/components/Auth/withAuth";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [careerSuggestions, setCareerSuggestions] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.userName);
        setCareerSuggestions(data.careerSuggestions);
      })

      .catch((error) =>
        console.error("Error fetching career suggestions:", error)
      );
  }, []);

  const firstCareer = careerSuggestions[0];
  const secondCareer = careerSuggestions[1];
  const thirdCareer = careerSuggestions[2];
  const fourthCareer = careerSuggestions[3];
  const ffifthCareer = careerSuggestions[4];

  return (
    <div className="text-white bg-slate-950 p-6">
      <div className="flex mt-8 ">
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
            class="bg-zinc-800 p-2 my-2 rounded-3xl flex-grow focus:outline-none"
            placeholder="Search..."
          />{" "}
        </div>

        <p>This career is an 80% match for you.</p>
      </div>

      <div className=" my-3 bg-gradient-to-t from-indigo-800 to-violet-500 rounded-xl p-1 flex h-40">
        <div className="w-52 ml-5">
          <h3 className="text-3xl"> {firstCareer && firstCareer.careerName}</h3>

          <button>call to action</button>
        </div>
        <div className="mr-5">
          <img src="/img-career.png" alt="profile" className="h-24" />
        </div>
      </div>

      <div>
        <p>Careers that might interest you</p>
        <div
          className="flex
   
   text-xl gap-2"
        >
          <div className="bg-purple-800 rounded-2xl">
            {secondCareer && secondCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl">
            {thirdCareer && thirdCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl">
            {fourthCareer && fourthCareer.careerName}
          </div>

          <div className="bg-purple-800 rounded-2xl">
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

export default  withAuth(Dashboard);
