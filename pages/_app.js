import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import AppBarFooterLayout from "@/layout/appBar&FooterLayout";
import App from "next/app";
import { createClient } from "contentful";
import safeJsonStringify from "safe-json-stringify"
import CartProvider from "@/context/cartProvider";

export default function MyApp({ Component, pageProps, categoryData }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#39C6A5",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <AppBarFooterLayout data={categoryData}>
            <Component {...pageProps} />
          </AppBarFooterLayout>
        </CartProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  let Response = await client.getEntries({ content_type: "category" });
  Response = safeJsonStringify(Response);
  const data = JSON.parse(Response);

  return { ...ctx, categoryData: data.items };
};
