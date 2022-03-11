import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Jukebox" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Jukebox" />
          <meta
            name="description"
            content="Spotify on Sonos Jukebox for kids"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#F8FAFC" />

          <link rel="apple-touch-icon" href="/icons/radio-384x384.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/radio-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/radio-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/radio-192x192.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/radio-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/radio-192x192.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Jukebox" />
          <meta
            property="og:description"
            content="Spotify on Sonos jukebox for kids"
          />
          <meta property="og:site_name" content="Jukebox" />
        </Head>
        <body className="p-0 m-0 bg-gray-900 text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
