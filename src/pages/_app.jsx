import Head from 'next/head';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" /> */}
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>Image Gallery</title>
        <meta name="description" content="Image Gallery ✓ Best Images ✓ HD Images. Discover Images in our Gallery " />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
