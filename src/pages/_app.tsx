import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { useColorScheme } from "src/components/hooks/useColorScheme";
import * as gtag from "src/utils/gtag";
import { AppRouter } from "./api/trpc/[trpc]";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { colorScheme, primaryColor, setColorSchemeAndPrimaryColor } =
    useColorScheme();

  useEffect(() => {
    localStorage.removeItem("cred");

    if (typeof window !== "undefined" && !window.ResizeObserver) {
      import("resize-observer").then(({ install }) => {
        install();
      });
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={setColorSchemeAndPrimaryColor}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor,
            other: { variant: colorScheme === "dark" ? "filled" : "outline" },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
