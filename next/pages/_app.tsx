import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";

export const CustomTheme = extendTheme(
  {
    components: {
      Link: {
        variants: {
          primary: ({ colorScheme = "blue" }) => ({
            color: `${colorScheme}.500`,
            _hover: {
              color: `${colorScheme}.400`,
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" }),
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={CustomTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
