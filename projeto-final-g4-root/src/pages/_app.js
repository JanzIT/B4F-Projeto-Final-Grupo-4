import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Urbanist } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser.user) {
        router.push("/auth");
      } else {
        router.push("/dashboard");
      }
      setRedirected(true);
    }
  }, [redirected, router]);

  return (
    <NextUIProvider>
      <div className={urbanist.className}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}
