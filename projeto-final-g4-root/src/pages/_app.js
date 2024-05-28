import "@/styles/globals.css";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={`${urbanist.className}`}>
      <Component {...pageProps} />;
    </div>
  );
}