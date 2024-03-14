import "@/styles/globals.css";
//import { GoogleOAuthProvider } from '@react-oauth/google';

import { Inter,  } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });
//const quickSand = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className} >
    <GoogleOAuthProvider clientId="899840330157-q2uo30jbjlvuv33206hkclrfgdvmr87s.apps.googleusercontent.com">
    <Component {...pageProps} />;
    </GoogleOAuthProvider>
</div>
  )
};

