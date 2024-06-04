import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "@/components/NavBar/NavBar";
import CourseCardDash from "@/components/DashBoard.js/CourseCardDash";
import CourseLabel from "@/components/DashBoard.js/CourseLabel";
import withAuth from "@/components/Auth/withAuth";
import { useUser } from "@/hooks/useUser";
import Streak from "@/components/Common/Streak";
import Modal from "react-modal";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`/api/user/${user._id}`);
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setUserName(data.user.name);
            setCareerSuggestions(data.user.careerSuggestions || []);
            setIsLoading(false); // Data is loaded, set loading to false
          }
        } catch (error) {
          console.error("Error fetching career suggestions:", error);
        }
      }
    };

    fetchUserData();
  }, [user?._id]);

  useEffect(() => {
    // Retry fetching user data until it's loaded
    const intervalId = setInterval(() => {
      if (isLoading && user && user._id) {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/user/${user._id}`);
            const data = await response.json();
            if (data.user) {
              setUser(data.user);
              setUserName(data.user.name);
              setCareerSuggestions(data.user.careerSuggestions || []);
              setIsLoading(false); // Data is loaded, set loading to false
            }
          } catch (error) {
            console.error("Error fetching career suggestions:", error);
          }
        };
        fetchUserData();
      }
    }, 1500); // Retry every 1.5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [isLoading, user]);

  if (!user || isLoading) {
    return <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-end p-[180px_24px_100px_24px] gap-[138px] text-white">LOADING SCREEN</div>;
  }

  const [firstCareer, secondCareer, thirdCareer, fourthCareer, fifthCareer] =
    careerSuggestions;

  const backgroundImages = [
    "cardbgimg1.png",
    "cardbgimg2.png",
    "cardbgimg3.png",
  ];

  const handleCareerClick = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove o usuário do localStorage
    router.push("/auth"); // Redireciona para a página de autenticação
  };

  const handleConfirmCareer = async () => {
    try {
      const response = await fetch('/api/setChosenCareer', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          career: selectedCareer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to set chosen career');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      router.push('/career');
    } catch (error) {
      console.error("Error setting chosen career:", error);
    }
  };

  return (
    <div className="text-white bg-slate-950 p-6">
      <div className="flex justify-between mt-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Hi, {userName}</h1>
          <h2 className="font-medium text-2xl">Find your new career</h2>

        </div>
        <div className="h-20 mb-2">
          <img src="/profile.webp" alt="profile" className="mb-6 h-20" />
        </div>
      </div>

      <div>
        <div className="flex items-center w-full bg-zinc-800 p-2 my-2 mt-2 rounded-3xl">
          <FaSearch className="text-gray-500 mx-3" />
          <input
            type="text"
            className="bg-zinc-800 text-gray-500 flex-grow focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <p className="mb-4 mt-8">These careers match your personality.</p>
      </div>

      {firstCareer && (
        <div
          onClick={() => handleCareerClick(firstCareer)}
          className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-3xl px-4 py-4 flex flex-row items-center justify-center h-40 cursor-pointer"
        >
          <div className="flex flex-row items-center p-2">
            <div className="mx-4">
              <h3 className="text-4xl font-semibold mb-2">
                {firstCareer.careerName}
              </h3>
              <button>Start Your Journey</button>
            </div>
            <div>
              <img src="/img-career.png" alt="career" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 mb-8">
        <p className="font-medium text-2xl">Careers that might interest you</p>
        <div className="flex items-center text-xl gap-2 mt-4 overflow-x-scroll">
          {[secondCareer, thirdCareer, fourthCareer, fifthCareer].map(
            (career, index) =>
              career && (
                <div
                  key={index}
                  onClick={() => handleCareerClick(career)}
                  className="cursor-pointer"
                >
                  <CourseLabel career={career} />
                </div>
              )
          )}
        </div>
      </div>

      <div>
        <p className="font-medium text-2xl">Popular courses</p>
        <div className="mt-4 flex flex-row overflow-x-scroll">
          <div className="text-4xl flex">
            {firstCareer && (
              <CourseCardDash
                career={firstCareer}
                backgroundImage={backgroundImages[0]}
              />
            )}
            {secondCareer && (
              <CourseCardDash
                career={secondCareer}
                backgroundImage={backgroundImages[1]}
              />
            )}
            {thirdCareer && (
              <CourseCardDash
                career={thirdCareer}
                backgroundImage={backgroundImages[2]}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Streak />
      </div>

      <div className="bg-gradient-to-br from-amber-700 to-rose-700 mt-10 my-10 flex flex-row items-center justify-center rounded-3xl p-5">
        <div>
          <p className="text-3xl font-semibold">Ignite your potential!</p>
          <p className="text-lg font-medium">5 Days Challenge</p>
        </div>

        <img src="/img-chalenge.png" alt="Challenge" className="" />
      </div>
      <NavBar />
      <div className="h-14 w-11/12"></div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Career Choice"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="bg-slate-900 text-white rounded-lg focus:outline-none
        p-6 w-96 mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Confirm Career Choice</h2>
        <p className="mb-4">Do you want to choose this Career Path?</p>
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-600 px-6 py-2 rounded-md mr-2"
          >
            No
          </button>
          <button
            onClick={handleConfirmCareer}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-md"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default withAuth(Dashboard);
