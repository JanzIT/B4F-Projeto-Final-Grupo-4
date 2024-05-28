import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div className={`${urbanist.className}`}>
        <Component {...pageProps} />;
      </div>
    </NextUIProvider>
  );
}
