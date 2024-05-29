import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useUser() {
    const router = useRouter()
    const [token, setToken] = useState()
    const [user, setUser] = useState()

    // fetchUserData() {
    //     //fetch
    // }

    useEffect(() => {
        // const user = fetchUserData()

        const rawdata = localStorage.getItem("user")
        const data = JSON.parse(rawdata)

        if (!data) {
            router.push("/auth")




        } else {

            // fetch("/api/user/" + user._id)
            //     .then((response) => response.json())
            //     .then((data) => {
            //         console.log(data)

            //         //Atualiza o valor que estiver dentro do hook
            //         setUser(data.user)
            //         setUserName(data.user.name);
            //         setCareerSuggestions(data.user.careerSuggestions);
            //     })

            setToken(data.token)
            setUser(data.user)
        }

    }, [router])


    return { user, token, setUser: setUser }
}