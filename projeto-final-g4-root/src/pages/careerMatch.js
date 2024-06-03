import { useState, useEffect } from "react";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";
import withAuth from "@/components/Auth/withAuth";
import axios from "axios";

function CareerMatch() {
  const [firstCareer, setFirstCareer] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      console.log(user.user._id);
      return await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          userId: user.user._id,
        }),
      });
    };
    //O Erro 304 é proveniente do fetch /api/user rodar duas vezes, resultando em "a informação requerida continua a mesma".

    fetchData()
      .then((response) => response.json())
      .then((data) => {
        setFirstCareer(data.carreers[0]);
      })
      .catch((error) =>
        console.error("Error fetching career suggestions:", error)
      );
  }, []);

  const goToCareer = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd h-screen flex flex-col justify-center items-center p-6">
      <img src="/img-career-match.png" alt="Logo" className="mb-6" />
      <div className="text-center text-white">
        <h1 className="text-3xl font-semibold">
          {firstCareer ? firstCareer.careerName : "Loading..."}
        </h1>
        <p className="mt-6 mb-4 font-semibold text-xl">
        This is the career that suits you best
{user}
        </p>
      </div>
      <Button label="Let's get started" onClick={goToCareer} />
    </div>
  );
}

export default withAuth(CareerMatch);