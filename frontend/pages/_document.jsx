import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;1,100&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;1,6..12,200&family=Poppins:ital,wght@1,200&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <body>
        <Navbar />
        <Main />
        <script
          src="https://kit.fontawesome.com/76fc76e1bc.js"
          crossOrigin={"anonymous"}
        ></script>
        <NextScript />
      </body>
    </Html>
  );
}
