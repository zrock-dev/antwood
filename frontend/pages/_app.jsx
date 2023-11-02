import App from "next/app";
import "../styles/global.css";
export default function SoleStyleApp({ Component, pageProps, example }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

SoleStyleApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, example: "data" };
};
